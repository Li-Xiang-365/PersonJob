<template>
  <nav class="float-nav" @wheel.prevent="navigateByWheel">
    <router-link
      v-for="(item, index) in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :title="item.name"
      :class="{ active: currentIndex === index }"
    >
      <span class="nav-dot">
        <span v-if="currentIndex === index" class="nav-dot-inner"></span>
      </span>
      <span class="nav-label">{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navItems = [
  { name: "首页", path: "/home/about" },
  { name: "技能", path: "/home/skills" },
  { name: "经历", path: "/home/experience" },
  { name: "作品", path: "/home/works" },
  { name: "AI", path: "/home/ai-chat" },
];

const currentIndex = ref(0);
const isScrolling = ref(false);
let wheelTimer = null;
const SCROLL_COOLDOWN = 300;

const findIndex = (path) => navItems.findIndex((item) => item.path === path);

watch(
  () => route.path,
  (path) => {
    const idx = findIndex(path);
    if (idx !== -1) currentIndex.value = idx;
  },
  { immediate: true },
);

function navigateByWheel(e) {
  if (isScrolling.value) return;
  isScrolling.value = true;

  const delta = e.deltaY > 0 ? 1 : -1;
  const nextIndex = currentIndex.value + delta;

  if (nextIndex >= 0 && nextIndex < navItems.length) {
    router.push(navItems[nextIndex].path);
  }

  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    isScrolling.value = false;
  }, SCROLL_COOLDOWN);
}
</script>

<style lang="less" scoped>
.float-nav {
  position: fixed;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 14px 10px;
  border-radius: 28px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);

    .nav-item .nav-label {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    .nav-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      border: 2.5px solid rgba(120, 210, 195, 0.5);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-dot-inner {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
        animation: dotPulse 1.8s ease-in-out infinite;
      }
    }

    .nav-label {
      font-size: 15px;
      color: rgba(200, 220, 230, 0.65);
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    &:hover {
      .nav-dot {
        background: rgba(0, 200, 170, 0.35);
        border-color: rgba(64, 212, 190, 0.85);
        box-shadow: 0 0 18px rgba(0, 200, 170, 0.35);
        transform: scale(1.15);
      }

      .nav-label {
        color: rgba(220, 240, 235, 0.95);
      }
    }

    &.router-link-active,
    &.active {
      .nav-dot {
        background: linear-gradient(
          135deg,
          rgba(0, 190, 170, 0.8),
          rgba(8, 145, 178, 0.8)
        );
        border-color: transparent;
        box-shadow:
          0 0 20px rgba(0, 190, 170, 0.5),
          0 0 40px rgba(0, 190, 170, 0.15);
      }

      .nav-label {
        opacity: 1;
        transform: translateX(0);
        color: #2dd4bf;
        text-shadow: 0 0 12px rgba(45, 212, 191, 0.3);
      }
    }
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.7);
  }
}

@media (max-width: 768px) {
  .float-nav {
    left: 12px;
    gap: 18px;

    .nav-item {
      .nav-dot {
        width: 14px;
        height: 14px;
      }

      .nav-label {
        font-size: 13px;
      }
    }
  }
}
</style>
