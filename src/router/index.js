import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "",
    name: "重定向",
    redirect: "/home/about",
  },
  {
    path: "/home",
    name: "首页",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "",
        redirect: "/home/about",
      },
      {
        path: "about",
        name: "关于",
        component: () => import("@/views/my/index.vue"),
      },
      {
        path: "skills",
        name: "技能",
        component: () => import("@/views/skills/index.vue"),
      },
      {
        path: "works",
        name: "作品",
        component: () => import("@/views/works/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
