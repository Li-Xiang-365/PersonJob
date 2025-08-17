<script setup>
import Navigation from "@/components/Navigation.vue";
import BgCanvas from "@/components/BgCanvas.vue";
</script>

<template>
  <div id="app">
    <BgCanvas class="bg_canvas" />
    <Navigation />
    <router-view />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
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
  z-index: 0;
}
</style>
