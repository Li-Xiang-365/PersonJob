<template>
  <div class="ai-chat">
    <div class="chat-container">
      <h1 class="page-title">AI 助手</h1>
      <p class="page-subtitle">基于简历信息，智能回答问题（GLM-4.7-Flash）</p>

      <div class="chat-messages" ref="messagesRef">
        <div
          class="message"
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.role"
        >
          <div class="message-avatar">
            {{ msg.role === "user" ? "你" : "AI" }}
          </div>
          <div class="message-body">
            <div
              class="message-text"
              :class="{
                streaming:
                  msg.role === 'assistant' &&
                  index === messages.length - 1 &&
                  isStreaming,
              }"
              v-html="msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content"
            ></div>
          </div>
        </div>
        <div class="typing-indicator" v-if="isWaiting">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>

      <div class="quick-questions" v-if="messages.length <= 1">
        <button
          class="quick-btn"
          v-for="(q, i) in quickQuestions"
          :key="i"
          @click="sendQuestion(q.text)"
        >
          {{ q.label }}
        </button>
      </div>

      <div class="input-area">
        <input
          type="text"
          v-model="inputText"
          @keydown.enter="sendMessage"
          placeholder="输入你的问题..."
          class="chat-input"
          :disabled="isTyping"
          ref="inputRef"
        />
        <button
          class="send-btn stop-btn"
          v-if="isStreaming || isWaiting"
          @click="stopGeneration"
        >
          停止生成
        </button>
        <button
          class="send-btn"
          v-else
          @click="sendMessage"
          :disabled="!inputText.trim()"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { SYSTEM_PROMPT } from "@/data/profile.js";
import { streamChat } from "@/api/ai.js";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
});

const messagesRef = ref(null);
const inputRef = ref(null);
const inputText = ref("");
const isTyping = ref(false);
const isStreaming = ref(false);
const isWaiting = ref(false);
let abortController = null;

const messages = ref([
  {
    role: "assistant",
    content:
      "你好！我是基于李想简历信息的 AI 助手。你可以问我关于技能、经历、作品等问题，我会根据他的信息为你解答。",
  },
]);

const quickQuestions = [
  { label: "他会什么技术？", text: "他掌握了哪些技术栈？" },
  { label: "做过什么项目？", text: "他做过哪些代表性项目？" },
  { label: "工作经历？", text: "他的工作经历是什么？" },
  { label: "如何联系他？", text: "他的联系方式是什么？" },
];

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
  });
}

function sendQuestion(text) {
  inputText.value = text;
  sendMessage();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderMarkdown(text) {
  return md.render(text);
}

function stopGeneration() {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
}

function focusInput() {
  nextTick(() => nextTick(() => inputRef.value?.focus()));
}

async function sendMessage() {
  const text = inputText.value.trim();
  if (!text || isTyping.value) return;

  messages.value.push({ role: "user", content: escapeHtml(text) });
  inputText.value = "";
  isTyping.value = true;
  isWaiting.value = true;
  scrollToBottom();

  // 构建对话历史（最近20条，不含当前用户消息，因为还没加入回复）
  const history = messages.value
    .filter((m) => m.role !== "typing")
    .slice(0, -1)
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.replace(/<[^>]*>/g, "") }));

  const apiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: text },
  ];

  messages.value.push({ role: "assistant", content: "" });
  const assistantIdx = messages.value.length - 1;
  isWaiting.value = false;
  isStreaming.value = true;
  scrollToBottom();

  abortController = new AbortController();

  try {
    await streamChat(apiMessages, {
      signal: abortController.signal,
      onDelta(delta) {
        messages.value[assistantIdx].content += delta;
        scrollToBottom();
      },
    });
  } catch (error) {
    if (error.name === "AbortError") {
      if (!messages.value[assistantIdx].content) {
        messages.value[assistantIdx].content = "（已停止生成）";
      }
    } else {
      messages.value[assistantIdx].content = `请求出错：${error.message}`;
    }
  } finally {
    abortController = null;
    isTyping.value = false;
    isStreaming.value = false;
    scrollToBottom();
    focusInput();
  }
}
</script>

<style lang="less" scoped>
.ai-chat {
  min-height: 100vh;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .chat-container {
    width: 100%;
    max-width: 720px;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);

    .page-title {
      text-align: center;
      font-size: 1.6rem;
      color: #f0f0f0;
      padding: 22px 0 4px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .page-subtitle {
      text-align: center;
      font-size: 0.88rem;
      color: rgba(180, 210, 220, 0.65);
      padding-bottom: 16px;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
      scroll-behavior: smooth;

      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .message {
        display: flex;
        gap: 12px;
        margin-bottom: 18px;

        &.user {
          flex-direction: row-reverse;

          .message-avatar {
            background: linear-gradient(
              135deg,
              rgba(0, 190, 170, 0.6),
              rgba(8, 145, 178, 0.6)
            );
          }

          .message-body {
            align-items: flex-end;

            .message-text {
              background: linear-gradient(
                135deg,
                rgba(0, 190, 170, 0.2),
                rgba(8, 145, 178, 0.2)
              );
              border: 1px solid rgba(0, 200, 170, 0.2);
              color: #e8f4f2;
              border-radius: 16px 16px 4px 16px;
            }
          }
        }

        &.assistant {
          .message-avatar {
            background: rgba(255, 255, 255, 0.1);
          }

          .message-body {
            .message-text {
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(255, 255, 255, 0.08);
              color: rgba(210, 230, 240, 0.92);
              border-radius: 16px 16px 16px 4px;

              &.streaming::after {
                content: "▊";
                color: rgba(64, 212, 190, 0.8);
                animation: cursorBlink 0.8s infinite;
              }
            }
          }
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(200, 225, 235, 0.95);
          flex-shrink: 0;
        }

        .message-body {
          display: flex;
          flex-direction: column;
          max-width: 80%;

          .message-text {
            padding: 12px 16px;
            font-size: 0.93rem;
            line-height: 1.7;
            word-break: break-word;

            :deep(strong) {
              color: rgba(220, 240, 235, 0.95);
              font-weight: 600;
            }

            :deep(code) {
              background: rgba(0, 0, 0, 0.25);
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 0.88em;
            }

            :deep(pre) {
              background: rgba(0, 0, 0, 0.3);
              padding: 12px;
              border-radius: 8px;
              overflow-x: auto;
              margin: 8px 0;
            }
          }
        }
      }

      .typing-indicator {
        display: flex;
        gap: 6px;
        padding: 12px 16px;
        align-self: flex-start;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(120, 210, 195, 0.5);
          animation: typingBounce 1.4s infinite both;

          &:nth-child(2) {
            animation-delay: 0.2s;
          }
          &:nth-child(3) {
            animation-delay: 0.4s;
          }
        }
      }

      @keyframes typingBounce {
        0%,
        60%,
        100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-8px);
          opacity: 1;
        }
      }

      @keyframes cursorBlink {
        0%,
        50% {
          opacity: 1;
        }
        51%,
        100% {
          opacity: 0;
        }
      }
    }

    .quick-questions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 20px 12px;

      .quick-btn {
        padding: 8px 16px;
        font-size: 0.83rem;
        color: rgba(120, 210, 195, 0.85);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(0, 200, 170, 0.15);
          border-color: rgba(0, 200, 170, 0.25);
          color: #2dd4bf;
        }
      }
    }

    .input-area {
      display: flex;
      gap: 10px;
      padding: 14px 20px 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(0, 0, 0, 0.15);

      .chat-input {
        flex: 1;
        padding: 12px 18px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        color: #e0eaef;
        font-size: 0.93rem;
        outline: none;
        transition: all 0.3s ease;

        &::placeholder {
          color: rgba(150, 180, 190, 0.5);
        }

        &:focus {
          border-color: rgba(0, 200, 170, 0.4);
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 0 12px rgba(0, 200, 170, 0.1);
        }

        &:disabled {
          opacity: 0.6;
        }
      }

      .send-btn {
        padding: 12px 24px;
        background: linear-gradient(
          135deg,
          rgba(0, 190, 170, 0.65),
          rgba(8, 145, 178, 0.65)
        );
        color: #fff;
        border: none;
        border-radius: 24px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;

        &:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            rgba(0, 215, 192, 0.8),
            rgba(14, 185, 213, 0.8)
          );
          box-shadow: 0 4px 16px rgba(0, 190, 170, 0.3);
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        &.stop-btn {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.55),
            rgba(220, 38, 38, 0.55)
          );

          &:hover {
            background: linear-gradient(
              135deg,
              rgba(239, 68, 68, 0.75),
              rgba(220, 38, 38, 0.75)
            );
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
          }
        }
      }
    }
  }
}
</style>
