import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("@/views/privacy.vue"),
    },
    {
      path: "/thanks",
      name: "thanks",
      component: () => import("@/views/thanks.vue"),
    },
    {
      path: "/offer-legal",
      name: "offer-legal",
      component: () => import("@/views/offer-legal.vue"),
    },
    {
      path: "/offer-physical",
      name: "offer-physical",
      component: () => import("@/views/offer-physical.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/profile.vue"),
    },
    {
      path: "/rent",
      name: "rent",
      component: () => import("@/views/rent.vue"),
    },
    {
      path: "/design",
      name: "design",
      component: () => import("@/views/design.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/cart.vue"),
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("@/views/shop/index.vue"),
      children: [
        {
          path: "/shop/:id",
          name: "product",
          component: () => import("@/views/shop/product.vue"),
        },
      ],
    },
  ],
});

export default router;
