<template>
  <div class="starry">
    <!-- 画布元素，用于渲染星空效果 -->
    <canvas
      class="star"
      ref="star"
      @mousemove="onMouseMove"
      @touchmove="onTouchMove"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @mouseleave="onMouseLeave"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

// 引用canvas元素
const star = ref(null);
// 状态变量
const star_color = ref("#ffffff"); // 星星颜色
const star_size = ref(2.5); // 星星大小
const star_min_scale = ref(0.3); // 星星最小缩放比例
const overflow_threshold = ref(50); // 溢出阈值
// 星星数量计算：根据屏幕宽度和高度的总和来决定星星的数量
// 使用Math.floor函数对结果进行向下取整，确保数量为整数
// 屏幕尺寸越大，显示的星星数量越多，提供更好的视觉效果
const star_count = ref(
  Math.floor((window.innerWidth + window.innerHeight) / 15)
); // 星星数量
const stars = ref([]); // 星星数组
const pointerX = ref(null); // 鼠标X坐标
const pointerY = ref(null); // 鼠标Y坐标
// 速度控制
const velocity = reactive({ x: 0, y: 0, tx: 0, ty: 0, z: 0 });
const touchInput = ref(false); // 是否触摸输入
const animationFrameId = ref(null); // 动画帧ID
const width = ref(0); // 画布宽度
const height = ref(0); // 画布高度
const scale = ref(1); // 缩放比例
const canvas = ref(null); // 画布元素
const ctx = ref(null); // 画布上下文
const isPlaying = ref(true); // 是否播放动画
const speedLevel = ref(1); // 速度等级
const twinkleEnabled = ref(true); // 是否启用闪烁效果

// 初始化方法
const init = () => {
  canvas.value = star.value;
  // 获取画布上下文
  ctx.value = canvas.value.getContext("2d");
  // 初始化星空效果相关方法
  generateStars(); // 生成星星数据
  setupCanvas(); // 设置画布
  startAnimation(); // 开始动画
  // 监听窗口大小变化事件，确保画布自适应
  window.addEventListener("resize", handleResize);
};

// 生成星星
const generateStars = () => {
  for (let i = 0; i < star_count.value; i++) {
    stars.value.push({
      x: 0, // X坐标
      y: 0, // Y坐标
      // Z轴位置
      z: star_min_scale.value + Math.random() * (1 - star_min_scale.value),
      color: getStarColor(), // 星星颜色
      twinkle: Math.random() * Math.PI * 2, // 闪烁相位
    });
  }
};

// 获取星星颜色
const getStarColor = () => {
  const colors = [
    "#ffffff", // 白色
    "#ffffcc", // 淡黄色
    "#ffcccc", // 淡红色
    "#ccccff", // 淡蓝色
    "#ccffcc", // 淡绿色
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 放置星星
const placeStar = (star) => {
  star.x = Math.random() * width.value;
  star.y = Math.random() * height.value;
};

// 回收星星
const recycleStar = (star) => {
  // 初始化方向指令为"z"，表示在z轴方向重新定位
  let directives = "z";
  // 获取速度向量的绝对值
  let vx = Math.abs(velocity.x);
  let vy = Math.abs(velocity.y);
  // 当速度在任一轴上都大于1时，决定重新定位的方向
  if (vx > 1 || vy > 1) {
    // 声明一个变量axis，用于存储坐标轴相关的数据或对象
    let axis;
    // 根据速度比例决定主要移动轴
    if (vx > vy) {
      // 以vx/(vx+vy)的概率选择水平轴，否则选择垂直轴
      axis = Math.random() < vx / (vx + vy) ? "h" : "v";
    } else {
      // 以vy/(vx+vy)的概率选择垂直轴，否则选择水平轴
      axis = Math.random() < vy / (vx + vy) ? "v" : "h";
    }
    // 根据主要移动轴和速度方向确定具体的边缘位置
    if (axis === "h") {
      // 水平方向：速度为正则从左侧进入，否则从右侧进入
      directives = velocity.x > 0 ? "l" : "r";
    } else {
      // 垂直方向：速度为正则从顶部进入，否则从底部进入
      directives = velocity.y > 0 ? "t" : "b";
    }
  }
  // 设置星星的z轴缩放比例（深度）
  star.z = star_min_scale.value + Math.random() * (1 - star_min_scale.value);
  // 随机分配星星的颜色
  star.color = getStarColor();
  // 随机设置闪烁的初始相位
  star.twinkle = Math.random() * Math.PI * 2;

  // 根据方向指令重新定位星星
  // 如果方向指令为"z"，则在z轴方向重新定位
  if (directives === "z") {
    // 在z轴方向重新定位：重置缩放比例，并随机分配x和y坐标
    star.z = star_min_scale.value;
    star.x = Math.random() * width.value;
    star.y = Math.random() * height.value;
  } else {
    // 在屏幕边缘重新定位
    if (directives === "l") {
      // 从左侧边缘进入
      star.x = -overflow_threshold.value;
      star.y = height.value * Math.random();
    } else if (directives === "r") {
      // 从右侧边缘进入
      star.x = width.value + overflow_threshold.value;
      star.y = height.value * Math.random();
    } else if (directives === "t") {
      // 从顶部边缘进入
      star.x = width.value * Math.random();
      star.y = -overflow_threshold.value;
    } else {
      // 从底部边缘进入
      star.x = width.value * Math.random();
      star.y = height.value + overflow_threshold.value;
    }
  }
};

// 设置画布
const setupCanvas = () => {
  // 获取设备像素比，默认为1
  scale.value = window.devicePixelRatio || 1;
  // 根据设备像素比计算画布宽度
  width.value = window.innerWidth * scale.value;
  // 根据设备像素比计算画布高度
  height.value = window.innerHeight * scale.value;
  // 设置画布的实际宽度
  canvas.value.width = width.value;
  // 设置画布的实际高度
  canvas.value.height = height.value;
  // 为所有星星元素进行位置布局
  stars.value.forEach(placeStar);
};

// 处理窗口大小改变
const handleResize = () => {
  // 清除之前的动画帧
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }

  // 重新设置画布
  setupCanvas();

  // 重新开始动画
  startAnimation();
};

// 开始动画
const startAnimation = () => {
  // 清除之前的动画帧;
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }

  // 开始新的动画循环
  animationFrameId.value = requestAnimationFrame(step);
};

// 动画步骤
const step = () => {
  // 如果动画未播放，则返回
  if (!isPlaying.value) return;

  // 清除画布内容
  ctx.value.clearRect(0, 0, width.value, height.value);
  // 更新星星位置
  update();
  // 渲染星星
  render();
  // 请求下一帧动画
  animationFrameId.value = requestAnimationFrame(step);
};

// 更新星星位置
const update = () => {
  /**
   * 更新星星位置和速度的动画效果
   * 通过速度衰减和位置偏移实现平滑的星星移动
   */
  velocity.tx *= 0.96; // 水平方向临时速度衰减
  velocity.ty *= 0.96; // 垂直方向临时速度衰减
  velocity.x += (velocity.tx - velocity.x) * 0.8; // 水平方向实际速度平滑过渡
  velocity.y += (velocity.ty - velocity.y) * 0.8; // 垂直方向实际速度平滑过渡

  // 根据速度级别调整速度倍率，范围在0.5到1.0之间
  const speedMultiplier = 0.5 + speedLevel.value * 0.5;

  // 遍历所有星星并更新其位置和状态
  stars.value.forEach((star) => {
    // 根据速度和星星深度更新星星位置
    star.x += velocity.x * star.z * speedMultiplier; // 水平位置更新
    star.y += velocity.y * star.z * speedMultiplier; // 垂直位置更新
    // 根据星星相对于屏幕中心的位置添加偏移效果
    star.x += (star.x - width.value / 2) * velocity.z * star.z;
    star.y += (star.y - height.value / 2) * velocity.z * star.z;
    star.z += velocity.z; // 更新星星的深度值

    // 更新闪烁效果
    if (twinkleEnabled.value) {
      star.twinkle += 0.05;
    }

    // 检查星星是否超出边界，如果超出则回收星星
    if (
      star.x < -overflow_threshold.value || // 判断星星是否超出左边界
      star.x > width.value + overflow_threshold.value || // 判断星星是否超出右边界
      star.y < -overflow_threshold.value || // 判断星星是否超出上边界
      star.y > height.value + overflow_threshold.value // 判断星星是否超出下边界
    ) {
      recycleStar(star); // 调用回收星星的函数，将超出边界的星星回收
    }
  });
};

// 渲染星星
const render = () => {
  stars.value.forEach((star) => {
    // 开始绘制路径
    ctx.value.beginPath();
    // 设置线条的端点样式为圆形
    ctx.value.lineCap = "round";

    // 根据闪烁效果调整透明度
    let alpha = 0.7;
    if (twinkleEnabled.value) {
      // 设置星星的透明度，通过正弦函数实现闪烁效果
      // 透明度范围在0到1之间，0.5是基础值，加上0.5乘以正弦值的结果
      // 当sin(star.twinkle)为1时，alpha值为1；当sin(star.twinkle)为-1时，alpha值为0
      alpha = 0.5 + 0.5 * Math.sin(star.twinkle);
    }

    // 设置线条宽度，根据星星的大小、z轴位置和缩放值计算
    ctx.value.lineWidth = star_size.value * star.z * scale.value;
    // 设置全局透明度
    ctx.value.globalAlpha = alpha;
    // 设置描边颜色为星星的颜色
    ctx.value.strokeStyle = star.color;

    // 将路径移动到星星的当前位置
    ctx.value.moveTo(star.x, star.y);
    // 计算星星尾部的x和y坐标，基于速度向量
    let tailx = velocity.x * 2;
    let taily = velocity.y * 2;
    // 如果x方向的速度绝对值小于0.1，则设置为0.5，避免尾部过短
    if (Math.abs(tailx) < 0.1) tailx = 0.5;
    // 如果y方向的速度绝对值小于0.1，则设置为0.5，避免尾部过短
    if (Math.abs(taily) < 0.1) taily = 0.5;
    // 绘制线条到星星尾部位置
    ctx.value.lineTo(star.x + tailx, star.y + taily);
    ctx.value.stroke();
  });
};

// 移动指针
// movePointer(event.clientX, event.clientY);
const movePointer = (x, y) => {
  // 检查pointerX和pointerY的值是否为数字类型
  if (
    typeof pointerX.value === "number" &&
    typeof pointerY.value === "number"
  ) {
    // 计算当前x坐标与上一次x坐标的差值
    let ox = x - pointerX.value;
    // 计算当前y坐标与上一次y坐标的差值
    let oy = y - pointerY.value;
    // 根据输入类型（触摸或非触摸）更新velocity的x轴速度分量
    velocity.tx =
      velocity.tx + (ox / 8) * scale.value * (touchInput.value ? 1 : -1);
    // 根据输入类型（触摸或非触摸）更新velocity的y轴速度分量
    velocity.ty =
      velocity.ty + (oy / 8) * scale.value * (touchInput.value ? 1 : -1);
  }
  // 更新pointerX的值为当前x坐标，用于下一次计算
  pointerX.value = x;
  // 更新pointerY的值为当前y坐标，用于下一次计算
  pointerY.value = y;
};

// 鼠标移动事件处理
const onMouseMove = (event) => {
  touchInput.value = false;
  movePointer(event.clientX, event.clientY);
};

// 触摸移动事件处理
const onTouchMove = (event) => {
  touchInput.value = true;
  movePointer(event.touches[0].clientX, event.touches[0].clientY);
  event.preventDefault();
};
// 触摸开始事件处理
const onTouchStart = (event) => {
  touchInput.value = true;
  pointerX.value = event.touches[0].clientX;
  pointerY.value = event.touches[0].clientY;
};

// 触摸结束事件处理
const onTouchEnd = () => {
  touchInput.value = false;
  pointerX.value = null;
  pointerY.value = null;
};

// 鼠标离开事件处理
const onMouseLeave = () => {
  pointerX.value = null;
  pointerY.value = null;
  // 不重置touchInput.value，因为这可能会影响触摸体验
};

// 切换动画播放状态
const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startAnimation();
  }
};

// 改变速度
const changeSpeed = () => {
  speedLevel.value = (speedLevel.value % 3) + 1;
};

// 切换闪烁效果
const toggleTwinkle = () => {
  twinkleEnabled.value = !twinkleEnabled.value;
};

// 组件挂载后初始化
onMounted(() => {
  init();
});

// 组件销毁前清理
onBeforeUnmount(() => {
  // 组件销毁前清除事件监听器和动画帧
  window.removeEventListener("resize", handleResize);
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<style lang="less" scoped>
.starry {
  width: 100%;
  height: 100%;
  overflow: hidden;

  /* 添加渐变背景 */
  background: linear-gradient(135deg, #000428, #004e92);
}

.star {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>