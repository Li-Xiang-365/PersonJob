<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">个人主页</router-link>
      </div>
      <div class="nav-menu" :class="{ active: isMenuOpen }">
        <router-link to="/about" class="nav-link" @click="toggleMenu"
          >首页</router-link
        >
        <router-link to="/about" class="nav-link" @click="toggleMenu"
          >关于</router-link
        >
        <router-link to="/skills" class="nav-link" @click="toggleMenu"
          >技能</router-link
        >
        <router-link to="/works" class="nav-link" @click="toggleMenu"
          >作品</router-link
        >
      </div>
      <div class="nav-toggle" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;

    .nav-logo {
      font-size: 1.5rem;
      font-weight: 700;

      a {
        color: #333;
        text-decoration: none;

        &:hover {
          color: #4a90e2;
        }
      }
    }

    .nav-menu {
      display: flex;

      .nav-link {
        margin-left: 30px;
        color: #333;
        text-decoration: none;
        font-weight: 500;
        position: relative;

        &:after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #4a90e2;
          transition: width 0.3s ease;
        }

        &:hover,
        &.router-link-active {
          color: #4a90e2;

          &:after {
            width: 100%;
          }
        }
      }
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;

      .bar {
        width: 25px;
        height: 3px;
        background: #333;
        margin: 3px 0;
        transition: 0.3s;
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    .nav-container {
      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.98);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        padding: 20px 0;

        &.active {
          left: 0;
        }

        .nav-link {
          margin: 15px 0;

          &:after {
            display: none;
          }
        }
      }

      .nav-toggle {
        display: flex;

        .bar {
          transform: none;
        }

        &.active .bar:nth-child(2) {
          opacity: 0;
        }

        &.active .bar:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        &.active .bar:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }
  }
}
</style>
