<template>
  <div class="works">
    <div class="container">
      <h1 class="page-title">我的作品</h1>
      <div class="page-intro">
        <p>
          这里展示了我参与开发的一些代表性项目，涵盖网站应用、小程序、工具项目等多个领域。每个项目都体现了我在不同技术栈上的实践经验和创新能力。
        </p>
      </div>

      <div class="works-grid">
        <WorkCard
          v-for="work in works"
          :key="work.id"
          :work="work"
          @click="showWorkDetail(work)"
        />
      </div>

      <div class="back-to-home">
        <router-link to="/home/about" class="btn">返回首页</router-link>
      </div>
    </div>

    <!-- 作品详情弹窗 -->
    <WorkModal
      :visible="!!selectedWork"
      :work="selectedWork || {}"
      @close="closeWorkDetail"
      @open-preview="openPreview"
    />

    <!-- 图片放大预览 -->
    <ImageLightbox :src="previewImage" @close="closePreview" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WorkCard from "./components/WorkCard.vue";
import WorkModal from "./components/WorkModal.vue";
import ImageLightbox from "./components/ImageLightbox.vue";
import { works } from "./worksData.js";

// 弹窗控制
const selectedWork = ref(null);
const previewImage = ref("");

function showWorkDetail(work) {
  selectedWork.value = work;
  document.body.style.overflow = "hidden";
}

function closeWorkDetail() {
  selectedWork.value = null;
  document.body.style.overflow = "";
}

function openPreview(src) {
  previewImage.value = src;
}

function closePreview() {
  previewImage.value = "";
}
</script>

<style lang="less" scoped>
.works {
  min-height: 100vh;
  padding: 40px 20px;

  .container {
    max-width: 1200px;
    margin: 0 auto;

    .page-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: #f0f0f0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .page-intro {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 40px;

      p {
        color: rgba(200, 225, 228, 0.82);
        font-size: 1.05rem;
        line-height: 1.7;
      }
    }

    .works-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 28px;
    }

    .back-to-home {
      text-align: center;
      margin-top: 50px;

      .btn {
        display: inline-block;
        padding: 12px 32px;
        background: linear-gradient(
          135deg,
          rgba(0, 190, 170, 0.62),
          rgba(8, 145, 178, 0.62)
        );
        color: #fff;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 500;
        border: 1px solid rgba(255, 255, 255, 0.1);
        letter-spacing: 0.5px;
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(
            135deg,
            rgba(0, 215, 192, 0.8),
            rgba(14, 185, 213, 0.8)
          );
          box-shadow: 0 4px 18px rgba(0, 190, 170, 0.3);
          transform: translateY(-1px);
        }
      }
    }
  }
}
</style>
