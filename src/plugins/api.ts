// import axios from "axios";
// import { useUserStoreRefs } from "~/store/useUserStore";

// export default defineNuxtPlugin((nuxtApp) => {
//   const config = useRuntimeConfig();
//   const { user } = useUserStoreRefs();

//   const main = axios.create({
//     baseURL: "/api/",
//     params: {
//       username: config.public.CONSUMER_KEY,
//       password: config.public.CONSUMER_SECRET,
//     },
//   });

//   const domain = axios.create({
//     baseURL: config.public.DOMAIN,
//     auth: {
//       username: config.public.CONSUMER_KEY,
//       password: config.public.CONSUMER_SECRET,
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   function addAuthInterceptor(axiosInstance: any) {
//     axiosInstance.interceptors.request.use(
//       (config: any) => {
//         if (user.value && user.value.token) {
//           config.headers.Authorization = `Bearer ${user.value.token}`;
//         }
//         return config;
//       },
//       (error: any) => {
//         return Promise.reject(error);
//       }
//     );
//   }

//   addAuthInterceptor(main);

//   return {
//     provide: {
//       main,
//       domain,
//     },
//   };
// });
