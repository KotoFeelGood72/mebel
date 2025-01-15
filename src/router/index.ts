import { createRouter, createWebHistory } from "vue-router";
import setupGlobalLoadingMiddleware from "@/middleware/loading";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL_ASSET),
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
      path: "/error",
      name: "error",
      component: () => import("@/views/error.vue"),
    },
    {
      path: "/cansel",
      name: "cansel",
      component: () => import("@/views/cansel.vue"),
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
      name: "articles",
      path: "/news",
      redirect: "/news/main",
      children: [
        {
          name: "news",
          path: "/news/main",
          component: () => import("@/views/news/index.vue"),
        },
        {
          name: "news-id",
          path: "/news/:id",
          component: () => import("@/views/news/news.vue"),
        },
      ],
    },

    {
      path: "/profile",
      component: () => import("@/views/profile.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          redirect: "/profile/user",
        },
        {
          path: "user",
          name: "profile",
          component: () => import("@/views/profile/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "order",
          name: "order",
          component: () => import("@/views/profile/order.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "edit",
          name: "edit",
          component: () => import("@/views/profile/edit.vue"),
          meta: { requiresAuth: true },
        },
      ],
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
      redirect: "/shop/products",
      children: [
        {
          path: "/shop/products/:id",
          name: "product",
          component: () => import("@/views/shop/product.vue"),
        },
        {
          path: "/shop/products",
          name: "product-list",
          component: () => import("@/views/shop/index.vue"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

setupGlobalLoadingMiddleware(router);

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Получаем данные пользователя и токена
  const userData = JSON.parse(localStorage.getItem("users") || "{}");
  const user = userData?.user || null;
  const token = userData?.token || null;

  // Проверяем наличие пользователя и токена для защищенных маршрутов
  if (requiresAuth && (!user || !token)) {
    next({ name: "home" }); // Если данные отсутствуют, перенаправляем на главную страницу
  } else {
    next();
  }
});

export default router;
