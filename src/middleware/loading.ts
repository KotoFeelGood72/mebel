import { useLoading } from "@/composables/useLoading";

export default function setupGlobalLoadingMiddleware(router: any) {
  const { setLoading } = useLoading();

  router.beforeEach((to: any, from: any, next: any) => {
    if (to.path !== from.path) {
      setLoading(true);
    }
    next();
  });

  router.afterEach(async (to: any, from: any) => {
    if (to.path !== from.path) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoading(false);
    }
  });
}
