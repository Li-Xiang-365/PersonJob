const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const API_KEY = import.meta.env.VITE_ZHIPU_API_KEY;

/**
 * 发送流式聊天请求
 * @param {Array} messages - 对话消息列表
 * @param {AbortSignal} signal - 用于取消请求的信号
 * @param {Function} onDelta - 收到内容片段时的回调
 * @returns {Promise<void>}
 */
export async function streamChat(messages, { signal, onDelta } = {}) {
  if (!API_KEY) {
    throw new Error("未配置 API Key，请在项目根目录创建 .env 文件，添加：VITE_ZHIPU_API_KEY=你的密钥");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    signal,
    body: JSON.stringify({
      model: "glm-4-flash",
      messages,
      stream: true,
      max_tokens: 4096,
      temperature: 1.0,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `请求失败 (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data:")) continue;

      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") break;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta && onDelta) {
          onDelta(delta);
        }
      } catch {
        // 忽略解析错误的行
      }
    }
  }
}
