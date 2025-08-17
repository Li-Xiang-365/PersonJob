import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "首页",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/skills",
    name: "技能",
    component: () => import("@/views/skills/index.vue"),
  },
  {
    path: "/works",
    name: "作品",
    component: () => import("@/views/works/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
