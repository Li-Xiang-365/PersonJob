<template>
  <div class="work-card" @click="$emit('click')">
    <div class="work-image">
      <img :src="work.image" :alt="work.title" />
      <div class="work-overlay">
        <span class="work-category">{{ categoryName }}</span>
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
</template>

<script setup>
defineProps({
  work: {
    type: Object,
    required: true,
  },
  categoryName: {
    type: String,
    default: "",
  },
});

defineEmits(["click"]);
</script>

<style lang="less" scoped>
.work-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 14px 36px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 200, 170, 0.2);
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
      background: rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 15px;
      z-index: 2;
      box-sizing: border-box;

      .work-category {
        background: linear-gradient(
          135deg,
          rgba(0, 190, 170, 0.72),
          rgba(8, 145, 178, 0.72)
        );
        color: #fff;
        padding: 5px 11px;
        border-radius: 15px;
        font-size: 0.8rem;
        position: relative;
        z-index: 3;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .work-info {
    padding: 20px;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 10px;
      color: #e8ecf4;
    }

    p {
      color: rgba(185, 215, 222, 0.78);
      line-height: 1.6;
      margin-bottom: 15px;
      font-size: 0.93rem;
    }

    .work-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tag {
        background: rgba(255, 255, 255, 0.06);
        color: rgba(155, 210, 205, 0.88);
        padding: 4px 11px;
        border-radius: 15px;
        font-size: 0.8rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
    }
  }
}
</style>
