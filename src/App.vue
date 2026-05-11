<script setup>
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <!-- 使用过渡动画  -->
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.main-content {
  width: 100%;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
