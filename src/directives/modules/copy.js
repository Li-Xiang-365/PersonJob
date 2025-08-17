export default {
  bind(el, { value }) {
    el.$copyValue = value
    el.handler = () => {
      if (!el.$copyValue) {
        // message.error('没有复制任何内容')
        return
      }
      // 复制成功
      // message.success('复制成功')
      // 复制到剪贴板
      this.copyText(el.$copyValue)
    }
    el.addEventListener('click', el.handler)
  },
  
}