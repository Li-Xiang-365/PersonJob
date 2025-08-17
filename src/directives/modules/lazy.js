export default {
  bind(el, binding, vnode) {
    //图片懒加载
    // console.log("el", el);
    // console.log("binding", binding);
    // console.log("vnode", vnode);

    // 保存原始图片URL到data-src属性
    let imgSrc = vnode.data.attrs.src || el.src;
    // console.log(el);
    el.src = "";
    // 创建一个新的IntersectionObserver实例，用于监听元素是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log("entries", entries);
        // 当有元素进入视口时，执行回调函数
        if (entries[0].isIntersecting) {
          // 从data-src获取真实图片URL并设置到src属性
          console.log("触发");
          el.src = imgSrc;
          // 图片加载后，停止观察
          observer.unobserve(el);
        }
      },
      {
        rootMargin: "0px", // 可以调整为提前加载，例如'50px'
        threshold: 0.01, // 当图片有1%进入视口时触发
      }
    );

    // 开始观察元素
    observer.observe(el);
  },
};

//另外一种方式使用原始的scroll事件，性能较大，可以使用节流函数优化性能
// export default {
//   bind(el, binding, vnode) {
//     //图片懒加载
//     console.log("el", el);
//     console.log("binding", binding);
//     console.log("vnode", vnode);

//     // 保存原始图片URL
//     const imgSrc = el.src;
//     el.src = "";

//     // 检查元素是否在视口内的函数
//     const isInViewport = (element) => {
//       const rect = element.getBoundingClientRect();
//       return (
//         rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.bottom >= 0 &&
//         rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
//         rect.right >= 0
//       );
//     };

//     // 加载图片函数
//     const loadImage = () => {
//       if (isInViewport(el)) {
//         console.log("触发");
//         el.src = imgSrc;
//         // 图片加载后，移除滚动监听
//         window.removeEventListener('scroll', loadImage);
//       }
//     };

//     // 初始检查一次元素是否在视口内
//     loadImage();

//     // 添加滚动事件监听
//     window.addEventListener('scroll', loadImage);

//     // 将事件监听器保存到元素上，以便后续解绑时使用
//     el._lazy_scroll = loadImage;
//   },

//   unbind(el) {
//     // 解绑时移除滚动事件监听
//     if (el._lazy_scroll) {
//       window.removeEventListener('scroll', el._lazy_scroll);
//       el._lazy_scroll = null;
//     }
//   },
// };
