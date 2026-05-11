<template>
  <div class="works">
    <div class="container">
      <h1 class="page-title">我的作品</h1>
      <div class="page-intro">
        <p>
          这里展示了我参与开发的一些代表性项目，涵盖网站应用、移动应用、工具项目等多个领域。每个项目都体现了我在不同技术栈上的实践经验和创新能力。
        </p>
      </div>

      <div class="works-filter">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id"
          :class="{ active: activeCategory === category.id }"
          class="filter-btn"
        >
          {{ category.name }}
        </button>
      </div>

      <div class="works-grid">
        <WorkCard
          v-for="work in filteredWorks"
          :key="work.id"
          :work="work"
          :category-name="getCategoryName(work.category)"
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
import { ref, computed } from "vue";
import WorkCard from "./components/WorkCard.vue";
import WorkModal from "./components/WorkModal.vue";
import ImageLightbox from "./components/ImageLightbox.vue";

const activeCategory = ref("all");

const categories = [
  { id: "all", name: "全部作品" },
  { id: "web", name: "网站应用" },
  { id: "app", name: "移动应用" },
  { id: "weChatH5", name: "设计作品" },
];

const works = [
  {
    id: 1,
    title: "电商平台",
    description:
      "一个功能完整的B2C电商平台，支持商品浏览、购物车、订单管理等功能",
    fullDescription:
      "这是一个基于Vue.js和Node.js构建的全栈电商平台。前端使用Vue3和Element Plus构建用户界面，后端采用Node.js和Express框架，数据库使用MongoDB。平台包含用户认证、商品管理、购物车、订单处理、支付集成等完整功能。采用响应式设计，支持PC和移动端访问。",
    image: "https://via.placeholder.com/400x300",
    category: "web",
    tags: ["Vue.js", "Node.js", "MongoDB", "电商"],
    technologies: [
      "Vue 3",
      "Element Plus",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Stripe",
    ],
    demoUrl: "https://example.com/demo1",
    codeUrl: "https://github.com/example/project1",
  },
  {
    id: 2,
    title: "任务管理应用",
    description: "一个简洁高效的任务管理工具，支持团队协作和任务分配",
    fullDescription:
      "这是一个基于React和Firebase构建的任务管理应用，支持个人和团队协作。用户可以创建、编辑和分配任务，设置截止日期和优先级，还可以通过评论功能进行团队沟通。应用采用实时数据同步，确保团队成员始终看到最新的任务状态。",
    image: "https://via.placeholder.com/400x300",
    category: "web",
    tags: ["React", "Firebase", "任务管理"],
    technologies: ["React", "Redux", "Firebase", "Material-UI", "React Router"],
    demoUrl: "https://example.com/demo2",
    codeUrl: "https://github.com/example/project2",
  },
  {
    id: 3,
    title: "健身追踪APP",
    description: "一款帮助用户记录健身计划和进度的移动应用",
    fullDescription:
      "这是一款使用React Native开发的跨平台健身追踪应用。用户可以创建个性化的健身计划，记录训练数据和身体指标，查看进度图表，并获得训练建议。应用还包含社交功能，用户可以与朋友分享成就和互相鼓励。",
    image: "https://via.placeholder.com/400x300",
    category: "app",
    tags: ["React Native", "健康", "健身"],
    technologies: [
      "React Native",
      "Redux",
      "Firebase",
      "Chart.js",
      "AsyncStorage",
    ],
    demoUrl: null,
    codeUrl: "https://github.com/example/project3",
  },
  {
    id: 4,
    title: "代码生成器",
    description: "一个根据用户输入自动生成常用代码片段的工具",
    fullDescription:
      "这是一个基于Web的代码生成工具，可以帮助开发者快速生成常用的代码片段。支持多种编程语言和框架，包括前端模板、API接口代码、数据库查询等。用户可以通过简单的界面配置，生成符合项目需求的代码，并支持一键复制和下载。",
    image: "https://via.placeholder.com/400x300",
    category: "tool",
    tags: ["工具", "代码生成", "效率"],
    technologies: ["Vue.js", "JavaScript", "Monaco Editor", "CodeMirror"],
    demoUrl: "https://example.com/demo4",
    codeUrl: "https://github.com/example/project4",
  },
  {
    id: 5,
    title: "企业官网设计",
    description: "为科技公司设计的现代化企业官网，注重用户体验和品牌展示",
    fullDescription:
      "这是一套为科技公司设计的企业官网UI/UX设计方案。设计采用简洁大方的风格，突出科技感和专业性。包含首页、产品介绍、关于我们、新闻动态、联系方式等多个页面。设计注重响应式布局和交互细节，确保在不同设备上都有良好的用户体验。",
    image: "https://via.placeholder.com/400x300",
    category: "design",
    tags: ["UI/UX", "网页设计", "品牌"],
    technologies: ["Figma", "Sketch", "Principle", "Photoshop"],
    demoUrl: "https://example.com/demo5",
    codeUrl: null,
  },
  {
    id: 7,
    title: "爱上学",
    description:
      "一个基于 Vue 3 + Vite 构建的现代化个人博客系统，具有美观的界面和丰富的交互体验",
    fullDescription:
      "个人博客项目 - 基于 Vue 3 Composition API 开发，使用动态星空背景效果，响应式设计完美适配各种设备。",
    mdPath: "/md/AiShangXue/AiShangXue.md",
    image: "https://via.placeholder.com/400x300",
    category: "weChatH5",
    tags: ["Vue 3", "Vite", "博客"],
    technologies: [
      "Vue 3",
      "Vite",
      "Ant Design Vue",
      "Element Plus",
      "Vue Router",
      "Pinia",
      "Less",
    ],
    demoUrl: null,
    codeUrl: null,
  },
  {
    id: 6,
    title: "天气预报应用",
    description: "一款美观实用的天气预报应用，提供详细的天气信息和预警",
    fullDescription:
      "这是一款使用原生Android开发的天气预报应用，集成了多个天气数据源，提供精准的天气预报信息。应用包含实时天气、未来7天预报、生活指数、天气预警等功能。界面设计简洁直观，支持动态主题和个性化设置。",
    image: "https://via.placeholder.com/400x300",
    category: "app",
    tags: ["Android", "天气", "原生开发"],
    technologies: ["Kotlin", "Android SDK", "Retrofit", "Glide", "Room"],
    demoUrl: null,
    codeUrl: "https://github.com/example/project6",
  },
];

const filteredWorks = computed(() => {
  if (activeCategory.value === "all") return works;
  return works.filter((work) => work.category === activeCategory.value);
});

const getCategoryName = (categoryId) => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "";
};

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

    .works-filter {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 40px;

      .filter-btn {
        padding: 8px 20px;
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        color: rgba(120, 210, 195, 0.85);
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.16);
        }

        &.active {
          background: linear-gradient(
            135deg,
            rgba(0, 190, 170, 0.58),
            rgba(8, 145, 178, 0.58)
          );
          color: #fff;
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 2px 12px rgba(0, 190, 170, 0.25);
        }
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
