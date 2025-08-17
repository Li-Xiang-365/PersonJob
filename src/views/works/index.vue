<template>
  <div class="works">
    <div class="container">
      <h1 class="page-title">我的作品</h1>
      <div class="page-intro">
        <p>这里展示了我参与开发的一些代表性项目，涵盖网站应用、移动应用、工具项目等多个领域。每个项目都体现了我在不同技术栈上的实践经验和创新能力。</p>
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
        <div 
          v-for="work in filteredWorks" 
          :key="work.id" 
          class="work-card"
          @click="showWorkDetail(work)"
        >
          <div class="work-image">
            <img :src="work.image" :alt="work.title">
            <div class="work-overlay">
              <span class="work-category">{{ getCategoryName(work.category) }}</span>
            </div>
          </div>
          <div class="work-info">
            <h3>{{ work.title }}</h3>
            <p>{{ work.description }}</p>
            <div class="work-tags">
              <span v-for="tag in work.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="back-to-home">
        <router-link to="/" class="btn">返回首页</router-link>
      </div>
    </div>

    <!-- 作品详情弹窗 -->
    <div v-if="selectedWork" class="work-modal" @click.self="closeWorkDetail">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedWork.title }}</h2>
          <button class="close-btn" @click="closeWorkDetail">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedWork.image" :alt="selectedWork.title">
          </div>
          <div class="modal-info">
            <div class="info-section">
              <h3>项目简介</h3>
              <p>{{ selectedWork.fullDescription }}</p>
            </div>
            <div class="info-section">
              <h3>技术栈</h3>
              <div class="tech-stack">
                <span v-for="tech in selectedWork.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
              </div>
            </div>
            <div class="info-section">
              <h3>项目链接</h3>
              <div class="project-links">
                <a v-if="selectedWork.demoUrl" :href="selectedWork.demoUrl" target="_blank" class="project-link">
                  <i class="fas fa-external-link-alt"></i> 在线演示
                </a>
                <a v-if="selectedWork.codeUrl" :href="selectedWork.codeUrl" target="_blank" class="project-link">
                  <i class="fab fa-github"></i> 源代码
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeCategory = ref("all");

const categories = [
  { id: "all", name: "全部作品" },
  { id: "web", name: "网站应用" },
  { id: "app", name: "移动应用" },
  { id: "tool", name: "工具项目" },
  { id: "design", name: "设计作品" }
];

const works = [
  {
    id: 1,
    title: "电商平台",
    description: "一个功能完整的B2C电商平台，支持商品浏览、购物车、订单管理等功能",
    fullDescription: "这是一个基于Vue.js和Node.js构建的全栈电商平台。前端使用Vue3和Element Plus构建用户界面，后端采用Node.js和Express框架，数据库使用MongoDB。平台包含用户认证、商品管理、购物车、订单处理、支付集成等完整功能。采用响应式设计，支持PC和移动端访问。",
    image: "https://via.placeholder.com/400x300",
    category: "web",
    tags: ["Vue.js", "Node.js", "MongoDB", "电商"],
    technologies: ["Vue 3", "Element Plus", "Node.js", "Express", "MongoDB", "JWT", "Stripe"],
    demoUrl: "https://example.com/demo1",
    codeUrl: "https://github.com/example/project1"
  },
  {
    id: 2,
    title: "任务管理应用",
    description: "一个简洁高效的任务管理工具，支持团队协作和任务分配",
    fullDescription: "这是一个基于React和Firebase构建的任务管理应用，支持个人和团队协作。用户可以创建、编辑和分配任务，设置截止日期和优先级，还可以通过评论功能进行团队沟通。应用采用实时数据同步，确保团队成员始终看到最新的任务状态。",
    image: "https://via.placeholder.com/400x300",
    category: "web",
    tags: ["React", "Firebase", "任务管理"],
    technologies: ["React", "Redux", "Firebase", "Material-UI", "React Router"],
    demoUrl: "https://example.com/demo2",
    codeUrl: "https://github.com/example/project2"
  },
  {
    id: 3,
    title: "健身追踪APP",
    description: "一款帮助用户记录健身计划和进度的移动应用",
    fullDescription: "这是一款使用React Native开发的跨平台健身追踪应用。用户可以创建个性化的健身计划，记录训练数据和身体指标，查看进度图表，并获得训练建议。应用还包含社交功能，用户可以与朋友分享成就和互相鼓励。",
    image: "https://via.placeholder.com/400x300",
    category: "app",
    tags: ["React Native", "健康", "健身"],
    technologies: ["React Native", "Redux", "Firebase", "Chart.js", "AsyncStorage"],
    demoUrl: null,
    codeUrl: "https://github.com/example/project3"
  },
  {
    id: 4,
    title: "代码生成器",
    description: "一个根据用户输入自动生成常用代码片段的工具",
    fullDescription: "这是一个基于Web的代码生成工具，可以帮助开发者快速生成常用的代码片段。支持多种编程语言和框架，包括前端模板、API接口代码、数据库查询等。用户可以通过简单的界面配置，生成符合项目需求的代码，并支持一键复制和下载。",
    image: "https://via.placeholder.com/400x300",
    category: "tool",
    tags: ["工具", "代码生成", "效率"],
    technologies: ["Vue.js", "JavaScript", "Monaco Editor", "CodeMirror"],
    demoUrl: "https://example.com/demo4",
    codeUrl: "https://github.com/example/project4"
  },
  {
    id: 5,
    title: "企业官网设计",
    description: "为科技公司设计的现代化企业官网，注重用户体验和品牌展示",
    fullDescription: "这是一套为科技公司设计的企业官网UI/UX设计方案。设计采用简洁大方的风格，突出科技感和专业性。包含首页、产品介绍、关于我们、新闻动态、联系方式等多个页面。设计注重响应式布局和交互细节，确保在不同设备上都有良好的用户体验。",
    image: "https://via.placeholder.com/400x300",
    category: "design",
    tags: ["UI/UX", "网页设计", "品牌"],
    technologies: ["Figma", "Sketch", "Principle", "Photoshop"],
    demoUrl: "https://example.com/demo5",
    codeUrl: null
  },
  {
    id: 6,
    title: "天气预报应用",
    description: "一款美观实用的天气预报应用，提供详细的天气信息和预警",
    fullDescription: "这是一款使用原生Android开发的天气预报应用，集成了多个天气数据源，提供精准的天气预报信息。应用包含实时天气、未来7天预报、生活指数、天气预警等功能。界面设计简洁直观，支持动态主题和个性化设置。",
    image: "https://via.placeholder.com/400x300",
    category: "app",
    tags: ["Android", "天气", "原生开发"],
    technologies: ["Kotlin", "Android SDK", "Retrofit", "Glide", "Room"],
    demoUrl: null,
    codeUrl: "https://github.com/example/project6"
  }
];

const filteredWorks = computed(() => {
  if (activeCategory.value === "all") {
    return works;
  }
  return works.filter(work => work.category === activeCategory.value);
});

const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : "";
};

const selectedWork = ref(null);

const showWorkDetail = (work) => {
  selectedWork.value = work;
  document.body.style.overflow = "hidden";
};

const closeWorkDetail = () => {
  selectedWork.value = null;
  document.body.style.overflow = "";
};
</script>

<style lang="less" scoped>


.works {
  min-height: 100vh;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.8);

  .container {
    max-width: 1200px;
    margin: 0 auto;

    .page-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: #333;
    }
    
    .page-intro {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 40px;
      
      p {
        color: #666;
        font-size: 1.1rem;
        line-height: 1.6;
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
        border: none;
        border-radius: 20px;
        background: #fff;
        color: #666;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #f0f0f0;
        }

        &.active {
          background: #4a90e2;
          color: #fff;
        }
      }
    }

    .works-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;

      .work-card {
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .work-image {
          position: relative;
          height: 200px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .work-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: flex-end;
            padding: 15px;

            .work-category {
              background: rgba(74, 144, 226, 0.9);
              color: #fff;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 0.8rem;
            }
          }

          &:hover img {
            transform: scale(1.05);
          }
        }

        .work-info {
          padding: 20px;

          h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: #333;
          }

          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
          }

          .work-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .tag {
              background: #f0f0f0;
              color: #666;
              padding: 4px 10px;
              border-radius: 15px;
              font-size: 0.8rem;
            }
          }
        }
      }
    }

    .back-to-home {
      text-align: center;
      margin-top: 50px;

      .btn {
        display: inline-block;
        padding: 12px 30px;
        background: #4a90e2;
        color: #fff;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 500;
        transition: background 0.3s ease;

        &:hover {
          background: #357abd;
        }
      }
    }
  }
}

.work-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;

  .modal-content {
    background: #fff;
    border-radius: 10px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #eee;

      h2 {
        font-size: 1.8rem;
        color: #333;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #999;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }

    .modal-body {
      padding: 20px;
      overflow-y: auto;
      flex-grow: 1;

      .modal-image {
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 8px;
        margin-bottom: 20px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .modal-info {
        .info-section {
          margin-bottom: 25px;

          h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: #4a90e2;
          }

          p {
            color: #666;
            line-height: 1.6;
          }

          .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            
            .tech-tag {
              background: #f0f0f0;
              color: #555;
              padding: 5px 12px;
              border-radius: 15px;
              font-size: 0.9rem;
            }
          }
          
          .project-links {
            display: flex;
            gap: 15px;
            
            .project-link {
              display: flex;
              align-items: center;
              color: #4a90e2;
              text-decoration: none;
              font-weight: 500;
              
              i {
                margin-right: 5px;
              }
              
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>k {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            .tech-tag {
              background: #f0f0f0;
              color: #666;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 0.9rem;
            }
          }

          .project-links {
            display: flex;
            gap: 15px;

            .project-link {
              display: flex;
              align-items: center;
              color: #4a90e2;
              text-decoration: none;

              i {
                margin-right: 5px;
              }

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
