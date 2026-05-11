<template>
  <div class="skills">
    <div class="container">
      <h1 class="page-title">我的技能</h1>
      <div class="page-intro">
        <p>
          专注于 <strong>前端开发</strong>，熟练掌握 <strong>Vue 全家桶</strong> 与
          <strong>TypeScript</strong>，具备小程序跨端、性能优化及 Node.js 后端接口开发能力。
        </p>
      </div>

      <div class="skills-container">
        <div
          class="skill-category"
          v-for="(category, index) in skills"
          :key="index"
        >
          <h2 class="category-title">{{ category.name }}</h2>
          <div class="skills-grid">
            <div
              class="skill-card"
              v-for="(skill, skillIndex) in category.items"
              :key="skillIndex"
            >
              <div class="skill-header">
                <div class="skill-icon">
                  <i :class="skill.icon"></i>
                </div>
                <div class="skill-header-text">
                  <h3>{{ skill.name }}</h3>
                  <div class="skill-tags" v-if="skill.tags?.length">
                    <span class="tag" v-for="tag in skill.tags" :key="tag">{{
                      tag
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="skill-level">
                <div class="skill-progress">
                  <div
                    class="progress-bar"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
                <span class="level-text">{{ skill.levelText }}</span>
              </div>
              <p class="skill-description">{{ skill.description }}</p>
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
import { skills } from "./skillsData.js";
</script>

<style lang="less" scoped>
.skills {
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

        strong {
          color: rgba(64, 212, 190, 0.95);
          font-weight: 600;
        }
      }
    }

    .skills-container {
      .skill-category {
        margin-bottom: 50px;

        .category-title {
          font-size: 1.7rem;
          margin-bottom: 25px;
          color: rgba(64, 212, 190, 0.95);
          position: relative;
          padding-bottom: 10px;
          text-shadow: 0 0 20px rgba(0, 200, 170, 0.3);

          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background: linear-gradient(
              90deg,
              rgba(0, 200, 170, 0.75),
              transparent
            );
            border-radius: 2px;
          }
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;

          .skill-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.09);
            border-radius: 14px;
            padding: 25px;
            box-shadow:
              0 6px 24px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              box-shadow:
                0 12px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.08);
              border-color: rgba(0, 200, 170, 0.22);
            }

            .skill-header {
              display: flex;
              align-items: flex-start;
              margin-bottom: 20px;

              .skill-icon {
                width: 50px;
                height: 50px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                background: rgba(0, 200, 170, 0.1);
                border: 1px solid rgba(0, 200, 170, 0.13);
                margin-right: 15px;

                i {
                  font-size: 1.7rem;
                  color: rgba(45, 212, 191, 0.9);
                }
              }

              .skill-header-text {
                flex: 1;
                min-width: 0;

                h3 {
                  font-size: 1.15rem;
                  color: #e8ecf4;
                  margin-bottom: 6px;
                  line-height: 1.3;
                }

                .skill-tags {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 6px;

                  .tag {
                    display: inline-block;
                    padding: 2px 8px;
                    font-size: 0.72rem;
                    color: rgba(64, 212, 190, 0.88);
                    background: rgba(0, 200, 170, 0.08);
                    border: 1px solid rgba(0, 200, 170, 0.12);
                    border-radius: 4px;
                    line-height: 1.5;
                    white-space: nowrap;
                  }
                }
              }
            }

            .skill-level {
              display: flex;
              align-items: center;
              margin-bottom: 15px;

              .skill-progress {
                flex-grow: 1;
                height: 8px;
                background: rgba(255, 255, 255, 0.07);
                border-radius: 4px;
                overflow: hidden;

                .progress-bar {
                  height: 100%;
                  background: linear-gradient(
                    90deg,
                    rgba(0, 190, 170, 0.72),
                    rgba(8, 145, 178, 0.72)
                  );
                  border-radius: 4px;
                  transition: width 1s ease;
                }
              }

              .level-text {
                margin-left: 10px;
                font-weight: 600;
                color: rgba(64, 208, 188, 0.95);
                font-size: 0.9rem;
              }
            }

            .skill-description {
              color: rgba(185, 215, 222, 0.78);
              line-height: 1.65;
              font-size: 0.92rem;
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
</style>
