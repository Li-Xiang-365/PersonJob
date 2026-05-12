<template>
  <div class="experience">
    <div class="container">
      <h1 class="page-title">工作经历</h1>
      <div class="page-intro">
        <p>我的职业成长之路，记录每一段宝贵的经历与收获。</p>
      </div>

      <div class="timeline">
        <div
          class="timeline-item"
          v-for="(item, index) in experiences"
          :key="index"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="time-period">{{ item.period }}</div>
            <h3 class="exp-title">{{ item.title }}</h3>
            <h4 class="exp-company">{{ item.company }}</h4>
            <p class="exp-project" v-if="item.project">{{ item.project }}</p>
            <div class="exp-section" v-if="item.responsibilities">
              <h5 class="section-label">主要职责</h5>
              <ul class="exp-list">
                <li
                  v-for="(r, ri) in item.responsibilities"
                  :key="ri"
                  v-html="r"
                ></li>
              </ul>
            </div>
            <div class="exp-section" v-if="item.achievements">
              <h5 class="section-label">工作业绩</h5>
              <ul class="exp-list achievements">
                <li
                  v-for="(a, ai) in item.achievements"
                  :key="ai"
                  v-html="a"
                ></li>
              </ul>
            </div>
            <div class="exp-tags" v-if="item.tags">
              <span class="tag" v-for="(tag, i) in item.tags" :key="i">{{
                tag
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="back-to-home">
        <router-link to="/home/about" class="btn">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const experiences = [
  {
    period: "2025.08 - 2026.04",
    title: "前端开发",
    company: "长沙万文学未来科技有限公司",
    project: "开发并维护企业管理平台",
    tags: ["Vue 3", "TypeScript", "AG Grid", "ECharts"],
    responsibilities: [
      "基于 <b>Axios</b> 封装 RESTful API 请求模块，集成请求/响应拦截器，实现统一异常处理、状态码校验，提升接口稳定性",
      "基于 <b>Pinia</b> 设计模块化状态管理方案，处理多模块复杂业务数据流，保障数据一致性",
      "基于 <b>AG Grid</b> 实现万级数据列表的展示、筛选、排序功能，结合产品需求设计前端数据处理方案",
    ],
    achievements: [
      "独立负责<b>绩效管理模块 0-1 落地</b>：完成需求对接、页面开发、接口联调与上线，支撑企业内部绩效流程线上化",
      "针对万级大数据量场景实施<b>前端性能优化</b>：采用分页加载提升首屏体验，结合 Web Worker 处理复杂计算，降低主线程阻塞，页面加载与交互流畅度显著提升",
      "<b>跨团队协作</b>：配合后端完成 AI 大模型接口对接，实现能力集成并上线至公司官网",
    ],
  },
  {
    period: "2025.04 - 2025.06",
    title: "前端开发实习",
    company: "湖南哆哆米科技有限公司",
    project:
      "负责公司 PC端用户平台和微信小程序的前端页面开发",
    tags: ["Vue 2", "Vuex", "Element UI", "Axios", "uni-app"],
    responsibilities: [
      "用 Vue.js 技术栈实现响应式布局，提升用户体验",
      "基于 Axios 封装 RESTful API 请求模块，集成拦截器实现统一错误处理",
      "采用 Vuex 进行全局状态管理，处理复杂业务数据流",
      "使用 Element UI，确保界面设计既美观又实用",
    ],
  },
];
</script>

<style lang="less" scoped>
.experience {
  min-height: 100vh;
  padding: 40px 20px;

  .container {
    max-width: 900px;
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
      max-width: 600px;
      margin: 0 auto 50px;

      p {
        color: rgba(200, 225, 228, 0.82);
        font-size: 1.05rem;
        line-height: 1.7;
      }
    }

    .timeline {
      position: relative;
      padding-left: 36px;

      &::before {
        content: "";
        position: absolute;
        left: 11px;
        top: 6px;
        bottom: 6px;
        width: 2px;
        background: linear-gradient(
          180deg,
          rgba(0, 190, 170, 0.4),
          rgba(8, 145, 178, 0.25),
          transparent
        );
        border-radius: 1px;
      }

      .timeline-item {
        position: relative;
        margin-bottom: 40px;

        &:last-child {
          margin-bottom: 0;
        }

        .timeline-dot {
          position: absolute;
          left: -31px;
          top: 8px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(0, 190, 170, 0.7),
            rgba(8, 145, 178, 0.7)
          );
          border: 3px solid rgba(10, 18, 28, 0.9);
          box-shadow: 0 0 12px rgba(0, 190, 170, 0.35);
          z-index: 1;
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 26px 28px;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(255, 255, 255, 0.07);
            border-color: rgba(0, 200, 170, 0.15);
            transform: translateX(4px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }

          .time-period {
            display: inline-block;
            font-size: 0.85rem;
            color: rgba(64, 212, 190, 0.9);
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
            padding: 3px 12px;
            background: rgba(0, 200, 170, 0.1);
            border-radius: 20px;
            border: 1px solid rgba(0, 200, 170, 0.15);
          }

          .exp-title {
            font-size: 1.3rem;
            color: #e8ecf4;
            margin-bottom: 6px;
          }

          .exp-company {
            font-size: 1rem;
            color: rgba(160, 200, 210, 0.85);
            font-weight: 500;
            margin-bottom: 14px;
          }

          .exp-project {
            color: rgba(185, 215, 222, 0.7);
            line-height: 1.6;
            font-size: 0.94rem;
            margin-bottom: 14px;
          }

          .exp-section {
            margin-bottom: 14px;

            .section-label {
              font-size: 0.85rem;
              color: rgba(64, 212, 190, 0.85);
              font-weight: 600;
              margin-bottom: 8px;
              padding-left: 2px;
            }

            .exp-list {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                position: relative;
                padding-left: 16px;
                margin-bottom: 8px;
                color: rgba(185, 215, 222, 0.78);
                line-height: 1.7;
                font-size: 0.9rem;

                &::before {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 9px;
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  background: rgba(120, 210, 195, 0.5);
                }

                :deep(b) {
                  color: rgba(220, 240, 235, 0.95);
                  font-weight: 600;
                }
              }

              &.achievements li::before {
                background: linear-gradient(
                  135deg,
                  rgba(0, 190, 170, 0.7),
                  rgba(8, 145, 178, 0.7)
                );
                box-shadow: 0 0 6px rgba(0, 190, 170, 0.3);
              }
            }
          }

          .exp-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .tag {
              padding: 4px 13px;
              font-size: 0.82rem;
              color: rgba(120, 210, 195, 0.85);
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 16px;
              transition: all 0.3s ease;

              &:hover {
                background: rgba(0, 200, 170, 0.12);
                border-color: rgba(0, 200, 170, 0.2);
                color: #2dd4bf;
              }
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

/* 移动端适配 */
@media (max-width: 768px) {
  .experience {
    padding: 24px 12px;

    .container {
      .page-title {
        font-size: 1.6rem;
        margin-bottom: 24px;
      }

      .page-intro {
        margin-bottom: 32px;

        p {
          font-size: 0.93rem;
        }
      }

      .timeline {
        padding-left: 24px;

        &::before {
          left: 7px;
        }

        .timeline-item {
          margin-bottom: 28px;

          .timeline-dot {
            left: -21px;
            width: 12px;
            height: 12px;
          }

          .timeline-content {
            padding: 18px 16px;
            border-radius: 12px;

            .time-period {
              font-size: 0.8rem;
              padding: 2px 10px;
            }

            .exp-title {
              font-size: 1.1rem;
            }

            .exp-company {
              font-size: 0.9rem;
              margin-bottom: 10px;
            }

            .exp-project {
              font-size: 0.88rem;
              margin-bottom: 10px;
            }

            .exp-section {
              margin-bottom: 10px;

              .section-label {
                font-size: 0.82rem;
              }

              .exp-list {
                li {
                  padding-left: 14px;
                  margin-bottom: 6px;
                  font-size: 0.85rem;
                  line-height: 1.6;
                }
              }
            }

            .exp-tags {
              gap: 6px;

              .tag {
                padding: 3px 10px;
                font-size: 0.78rem;
              }
            }
          }
        }
      }

      .back-to-home {
        margin-top: 32px;

        .btn {
          padding: 10px 24px;
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
