<template>
  <div class="home">
    <div class="content">
      <!-- 微信图片模态框 -->
      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <div class="modal-content">
          <img src="@/assets/image/weichat.jpg" alt="微信二维码" />
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
      </div>
      <div class="profile-card">
        <div class="avatar">
          <img src="https://picsum.photos/200/200" alt="个人头像" />
        </div>
        <h1>李想</h1>
        <p class="title">前端开发工程师</p>
        <div class="info">
          <p>📧 15879955069@163.com</p>
          <p>📱 158-7995-5069</p>
          <!-- <p>🌐 www.example.com</p> -->
          <p>📍 江西萍乡</p>
        </div>
        <div class="bio">
          <p>
            我是一名热爱编程的前端开发工程师,2025届应届毕业生。擅长使用Vue.js、uniapp和Node.js等技术栈,对新技术充满热情,喜欢解决复杂问题。
          </p>
        </div>
        <div class="social-links">
          <!-- github -->
          <!-- <a href="#" class="social-link"><i class="fab fa-github"></i></a> -->
          <!-- gitee -->
          <a href="#" class="social-link" @click="geTo('gitee')"
            ><i class="fab fa-git-alt"></i
          ></a>
          <!-- qq -->
          <a href="#" class="social-link"><i class="fab fa-qq"></i></a>
          <!-- 微信 -->
          <a href="#" class="social-link" @click="showImage('weixin')"
            ><i class="fab fa-weixin"></i
          ></a>
        </div>

        <div class="actions">
          <router-link to="/home/skills" class="btn primary"
            >查看技能</router-link
          >
          <router-link to="/home/works" class="btn primary"
            >查看作品</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isModalOpen = ref(false);
const geTo = function (type) {
  if (type == "gitee") {
    // 打开gitee仓库
    window.open(`https://gitee.com/LiXiang--Gitee`);
  }
};
const showImage = function (type) {
  if (type === "weixin") {
    isModalOpen.value = true;
  }
};
const closeModal = function () {
  isModalOpen.value = false;
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  .content {
    width: 80%;
    max-width: 600px;

    .profile-card {
      background: rgba(255, 255, 255, 0.07);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 35px;
      box-shadow:
        0 10px 40px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
      animation: fadeIn 0.8s ease-in-out;

      .avatar {
        margin-bottom: 22px;

        img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 4px 20px rgba(0, 200, 170, 0.25);
        }
      }

      h1 {
        font-size: 2.3rem;
        margin-bottom: 10px;
        color: #f0f0f0;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      .title {
        font-size: 1.1rem;
        color: rgba(64, 212, 190, 0.9);
        margin-bottom: 22px;
        letter-spacing: 1px;
      }

      .info {
        text-align: left;
        margin-bottom: 25px;

        p {
          margin: 9px 0;
          color: rgba(220, 235, 240, 0.88);
          font-size: 0.95rem;
        }
      }

      .bio {
        text-align: left;
        margin-bottom: 28px;

        p {
          margin: 0;
          color: rgba(200, 220, 230, 0.82);
          line-height: 1.7;
          font-size: 0.93rem;
        }
      }

      .social-links {
        display: flex;
        justify-content: center;
        gap: 14px;
        margin-bottom: 28px;

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(120, 210, 195, 0.85);
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.07);

          &:hover {
            background: rgba(0, 200, 170, 0.28);
            color: #fff;
            transform: translateY(-2px);
            border-color: rgba(0, 200, 170, 0.35);
          }

          i {
            font-size: 1.15rem;
          }
        }
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 14px;

        .btn {
          padding: 11px 26px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;

          &.primary {
            background: linear-gradient(
              135deg,
              rgba(0, 190, 170, 0.7),
              rgba(8, 145, 178, 0.7)
            );
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.12);

            &:hover {
              background: linear-gradient(
                135deg,
                rgba(0, 215, 192, 0.85),
                rgba(14, 185, 213, 0.85)
              );
              box-shadow: 0 4px 18px rgba(0, 190, 170, 0.35);
              transform: translateY(-1px);
            }
          }

          &.secondary {
            background: rgba(255, 255, 255, 0.07);
            color: rgba(120, 210, 195, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);

            &:hover {
              background: rgba(255, 255, 255, 0.15);
              border-color: rgba(255, 255, 255, 0.18);
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 模态框样式 */
.modal {
  /* 设置模态框为固定定位，覆盖整个视口 */
  /* 全屏固定定位遮罩层样式 */
  position: fixed; /* 使用固定定位，相对于浏览器窗口定位 */
  z-index: 1000; /* 设置较高的层级，确保遮罩层显示在最上层 */
  left: 0; /* 左侧对齐到浏览器窗口左边缘 */
  top: 0; /* 顶部对齐到浏览器窗口顶部 */
  width: 100%; /* 宽度设置为浏览器窗口的100% */
  height: 100%; /* 高度设置为浏览器窗口的100% */
  background-color: rgba(0, 0, 0, 0.8); /* 设置半透明黑色背景 */
  display: flex; /* 使用弹性布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center;
  animation: fadeIn 0.3s ease-in-out; /* 添加淡入动画效果，持续0.3秒，缓动函数为ease-in-out */
}

/* 弹出内容容器样式 */
.modal-content {
  position: relative; /* 设置相对定位，作为内部元素的定位参考 */
  max-width: 90%; /* 设置最大宽度为视口宽度的90% */
  max-height: 90%; /* 设置最大高度为视口高度的90% */

  animation: zoomIn 0.3s ease-in-out; /* 添加缩放进入动画，持续0.3秒，使用ease-in-out时间函数 */
}

.modal-content img {
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover {
  background-color: #fff;
  transform: rotate(90deg);
}

/**
 * 定义了一个名为 zoomIn 的关键帧动画
 * 该动画实现了一个从较小到放大的淡入效果
 */
@keyframes zoomIn {
  from {
    // 动画的起始状态
    opacity: 0; // 初始透明度为0（完全透明）
    transform: scale(0.7); // 初始缩放比例为0.7（原始大小的70%）
  }
  to {
    // 动画的结束状态
    opacity: 1; // 最终透明度为1（完全不透明）
    transform: scale(1); // 最终缩放比例为1（原始大小）
  }
}
</style>
