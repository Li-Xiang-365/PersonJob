<template>
  <div class="home">
    <div class="content">
      <div class="profile-card">
        <div class="avatar">
          <img src="https://picsum.photos/200/200" alt="个人头像" />
        </div>
        <h1>张三</h1>
        <p class="title">全栈开发工程师</p>
        <div class="info">
          <p>📧 zhangsan@example.com</p>
          <p>📱 138-xxxx-xxxx</p>
          <p>🌐 www.example.com</p>
          <p>📍 北京市朝阳区</p>
        </div>
        <div class="bio">
          <p>
            我是一名热爱编程的全栈开发工程师,拥有5年的Web开发经验。专注于创建高性能、用户友好的应用程序。擅长使用Vue.js、React和Node.js等技术栈，对新技术充满热情，喜欢解决复杂问题。
          </p>
        </div>
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-github"></i></a>
          <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-link"><i class="fab fa-weixin"></i></a>
        </div>
        <div class="actions">
          <router-link to="/skills" class="btn primary">查看技能</router-link>
          <router-link to="/works" class="btn secondary">查看作品</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
      background: rgba(255, 255, 255, 0.9);
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.8s ease-in-out;

      .avatar {
        margin-bottom: 20px;

        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        color: #333;
      }

      .title {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 20px;
      }

      .info {
        text-align: left;
        margin-bottom: 25px;

        p {
          margin: 8px 0;
          color: #555;
        }
      }

      .bio {
        text-align: left;
        margin-bottom: 25px;

        p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }
      }

      .social-links {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 25px;

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f5f5f5;
          color: #555;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            background: #4a90e2;
            color: #fff;
          }

          i {
            font-size: 1.2rem;
          }
        }
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 15px;

        .btn {
          padding: 10px 25px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;

          &.primary {
            background: #4a90e2;
            color: #fff;

            &:hover {
              background: #357abd;
            }
          }

          &.secondary {
            background: #f5f5f5;
            color: #555;

            &:hover {
              background: #e0e0e0;
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
</style>