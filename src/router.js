import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "root",
    component: () => import("./components/Manual")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./components/SearchPage")
  },
  {
    path: "/manual",
    name: "manual",
    component: () => import("./components/Manual")
  },
  {
    path: "/constructor",
    name: "constructor",
    component: () => import("./components/Constructor")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;