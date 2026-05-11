<template>
  <Teleport to="body">
    <div v-if="src" class="image-lightbox" @click="$emit('close')">
      <img :src="src" class="lightbox-img" />
      <button class="lightbox-close" @click.stop="$emit('close')">&times;</button>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

defineProps({
  src: {
    type: String,
    default: "",
  },
});

defineEmits(["close"]);

function onKeydown(e) {
  if (e.key === "Escape") {
    // emit close to parent
    window.dispatchEvent(new CustomEvent("lightbox-escape"));
  }
}

onMounted(() => document.addEventListener("keydown", onKeydown));
onUnmounted(() => document.removeEventListener("keydown", onKeydown));
</script>

<style lang="less" scoped>
.image-lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;

  .lightbox-img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    animation: lightboxIn 0.25s ease-out;
  }

  .lightbox-close {
    position: absolute;
    top: 20px;
    right: 24px;
    background: rgba(255, 255, 255, 0.12);
    border: none;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.24);
    }
  }
}

@keyframes lightboxIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
