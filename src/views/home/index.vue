<script setup>
import Navigation from "@/components/Navigation.vue";
import BgCanvas from "@/components/BgCanvas.vue";
</script>

<template>
  <div class="home">
    <BgCanvas class="bg_canvas" />
    <!-- <Navigation /> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100%;
  position: relative;
}

.bg_canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 确保背景在内容下方 */
}

/* 确保所有子页面的内容位于背景上方 */
:deep(.router-view) {
  position: relative;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .home {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
