<template>
  <Teleport to="body">
    <div v-if="visible" class="work-modal" @click.self="handleClose">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ work.title }}</h2>
          <button class="close-btn" @click="handleClose">&times;</button>
        </div>
        <div class="modal-body">
          <!-- <div class="modal-image">
            <img :src="work.image" :alt="work.title" />
          </div> -->
          <div class="modal-info">
            <div class="info-section">
              <!-- <h3>项目简介</h3> -->
              <template v-if="work.mdPath">
                <div v-if="mdLoading" class="md-loading">加载中...</div>
                <VueMarkdown
                  v-else-if="mdContent"
                  :source="mdContent"
                  class="md-content"
                  :options="{ html: true, linkify: true, typographer: true }"
                />
                <p v-else>{{ work.fullDescription }}</p>
              </template>
              <p v-else>{{ work.fullDescription }}</p>
            </div>
            <div class="info-section">
              <h3>技术栈</h3>
              <div class="tech-stack">
                <span
                  v-for="tech in work.technologies"
                  :key="tech"
                  class="tech-tag"
                  >{{ tech }}</span
                >
              </div>
            </div>
            <div class="info-section">
              <h3>项目链接</h3>
              <div class="project-links">
                <a
                  v-if="work.demoUrl"
                  :href="work.demoUrl"
                  target="_blank"
                  class="project-link"
                >
                  <i class="fas fa-external-link-alt"></i> 在线演示
                </a>
                <a
                  v-if="work.codeUrl"
                  :href="work.codeUrl"
                  target="_blank"
                  class="project-link"
                >
                  <i class="fab fa-github"></i> 源代码
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import VueMarkdown from "vue-markdown-render";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  work: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close", "open-preview"]);

const mdContent = ref("");
const mdLoading = ref(false);

// MD 内容缓存（跨实例共享）
const mdCache = {};

async function loadMarkdown(path) {
  if (!path) return "";
  if (mdCache[path]) {
    mdContent.value = mdCache[path];
    return;
  }
  try {
    mdLoading.value = true;
    const res = await fetch(path);
    const text = await res.text();
    mdCache[path] = text;
    mdContent.value = text;
  } catch (e) {
    console.error("加载 MD 文件失败:", e);
    mdContent.value = "";
  } finally {
    mdLoading.value = false;
  }
}

function handleClose() {
  mdContent.value = "";
  emit("close");
}

function bindMdImgClick() {
  nextTick(() => {
    const container = document.querySelector(".md-content");
    if (!container) return;
    const imgs = container.querySelectorAll("img");
    imgs.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => emit("open-preview", img.src));
    });
  });
}

watch(
  () => props.visible,
  async (val) => {
    if (val && props.work.mdPath) {
      await loadMarkdown(props.work.mdPath);
    }
  },
);

watch(mdContent, () => bindMdImgClick());

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
});

function handleEsc(e) {
  if (e.key === "Escape" && props.visible) handleClose();
}
</script>

<style lang="less" scoped>
.work-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;

  .modal-content {
    background: rgba(18, 26, 30, 0.88);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);

      h2 {
        font-size: 1.7rem;
        color: #f0f0f0;
      }

      .close-btn {
        background: rgba(255, 255, 255, 0.07);
        border: none;
        font-size: 1.4rem;
        color: rgba(175, 210, 210, 0.8);
        cursor: pointer;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
        }
      }
    }

    .modal-body {
      padding: 24px;
      overflow-y: auto;
      overflow-x: hidden;
      flex-grow: 1;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .modal-image {
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.07);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .modal-info {
        .info-section {
          margin-bottom: 10px;

          h3 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: rgba(64, 208, 188, 0.95);
          }

          p {
            color: rgba(185, 215, 222, 0.8);
            line-height: 1.65;
            font-size: 0.94rem;
          }

          .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .tech-tag {
              background: rgba(0, 200, 170, 0.1);
              color: rgba(110, 210, 198, 0.92);
              padding: 5px 13px;
              border-radius: 15px;
              font-size: 0.88rem;
              border: 1px solid rgba(0, 200, 170, 0.14);
            }
          }

          .project-links {
            display: flex;
            gap: 15px;

            .project-link {
              display: flex;
              align-items: center;
              color: rgba(94, 204, 189, 0.9);
              text-decoration: none;
              font-weight: 500;
              padding: 8px 16px;
              border-radius: 20px;
              background: rgba(0, 200, 170, 0.09);
              border: 1px solid rgba(0, 200, 170, 0.14);
              transition: all 0.3s ease;

              i {
                margin-right: 5px;
              }

              &:hover {
                background: rgba(0, 200, 170, 0.18);
                border-color: rgba(0, 200, 170, 0.28);
                box-shadow: 0 2px 10px rgba(0, 190, 170, 0.2);
              }
            }
          }

          .md-loading {
            color: rgba(185, 215, 222, 0.6);
            padding: 10px 0;
          }

          :deep(.md-content) {
            color: rgba(185, 215, 222, 0.8);
            line-height: 1.7;
            font-size: 0.93rem;

            h1 {
              font-size: 1.5rem;
              color: #e8ecf4;
              margin: 20px 0 12px;
              padding-bottom: 8px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }

            h2 {
              font-size: 1.25rem;
              color: rgba(64, 208, 188, 0.95);
              margin: 16px 0 10px;
            }

            h3 {
              font-size: 1.1rem;
              color: rgba(100, 210, 195, 0.9);
              margin: 14px 0 8px;
            }

            p {
              margin: 8px 0;
              line-height: 1.7;
            }

            ul,
            ol {
              padding-left: 20px;
              margin: 8px 0;

              li {
                margin: 4px 0;
                line-height: 1.6;
              }
            }

            code {
              background: rgba(0, 200, 170, 0.12);
              color: rgba(110, 230, 210, 0.95);
              padding: 2px 7px;
              border-radius: 4px;
              font-family: "Fira Code", "Consolas", monospace;
              font-size: 0.88em;
            }

            pre {
              background: rgba(10, 20, 28, 0.9);
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 8px;
              padding: 14px 18px;
              overflow-x: auto;
              margin: 12px 0;

              code {
                background: transparent;
                color: rgba(180, 220, 215, 0.9);
                padding: 0;
                font-size: 0.85rem;
                line-height: 1.55;
              }
            }

            a {
              color: rgba(64, 208, 188, 0.95);
              text-decoration: none;
              transition: color 0.2s ease;

              &:hover {
                color: rgba(100, 235, 218, 1);
                text-decoration: underline;
              }
            }

            blockquote {
              border-left: 3px solid rgba(0, 200, 170, 0.45);
              background: rgba(0, 200, 170, 0.04);
              padding: 10px 16px;
              margin: 12px 0;
              border-radius: 0 6px 6px 0;
              color: rgba(165, 205, 200, 0.82);

              p {
                margin: 0;
              }
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin: 12px 0;

              th,
              td {
                border: 1px solid rgba(255, 255, 255, 0.08);
                padding: 8px 12px;
                text-align: left;
                font-size: 0.88rem;
              }

              th {
                background: rgba(0, 200, 170, 0.1);
                color: rgba(100, 210, 198, 0.92);
                font-weight: 600;
              }

              td {
                color: rgba(185, 215, 222, 0.78);
              }
            }

            img {
              max-width: 100%;
              border-radius: 8px;
              margin: 10px 0;
            }

            hr {
              border: none;
              border-top: 1px solid rgba(255, 255, 255, 0.07);
              margin: 20px 0;
            }
          }
        }
      }
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .work-modal {
    padding: 0;
    align-items: flex-end;

    .modal-content {
      max-height: 92vh;
      border-radius: 16px 16px 0 0;
      max-width: 100%;

      .modal-header {
        padding: 14px 16px;

        h2 {
          font-size: 1.25rem;
        }

        .close-btn {
          width: 30px;
          height: 30px;
          font-size: 1.2rem;
        }
      }

      .modal-body {
        padding: 16px;

        .modal-info {
          .info-section {
            margin-bottom: 16px;

            h3 {
              font-size: 1.05rem;
              margin-bottom: 8px;
            }

            p {
              font-size: 0.88rem;
            }

            .tech-stack {
              gap: 6px;

              .tech-tag {
                padding: 4px 10px;
                font-size: 0.82rem;
              }
            }

            .project-links {
              flex-direction: column;
              gap: 10px;

              .project-link {
                justify-content: center;
                padding: 10px 14px;
                font-size: 0.9rem;
              }
            }

            :deep(.md-content) {
              font-size: 0.88rem;

              h1 {
                font-size: 1.3rem;
              }

              h2 {
                font-size: 1.1rem;
              }

              pre {
                padding: 10px 12px;
                font-size: 0.82rem;
              }

              table {
                display: block;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
              }
            }
          }
        }
      }
    }
  }
}
</style>
