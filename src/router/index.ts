import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Container from "../views/Container.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Container",
    component: Container,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
