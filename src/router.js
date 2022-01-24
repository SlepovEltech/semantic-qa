import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "search",
    component: () => import("./components/SearchPage")
  },
  {
    path: "/manual",
    name: "manual",
    component: () => import("./components/Manual")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;