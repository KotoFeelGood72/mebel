import { defineStore, storeToRefs } from "pinia";
import { useModalStore } from "./useModalStore";
import { auth, api } from "@/api/axios";

interface shipping {
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  postcode?: string;
  state?: string;
  address?: string;
}
interface billing {
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  postcode?: string;
  state?: string;
  address?: string;
}

interface User {
  ID: number | null;
  billing: billing;
  shipping: shipping;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  token: string | null;
}

export const useUserStore = defineStore("users", {
  state: () => ({
    user: {
      ID: 0,
      billing: {
        address_1: "",
        address_2: "",
        city: "",
        country: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        postcode: "",
        state: "",
        address: "",
      },
      shipping: {
        address_1: "",
        address_2: "",
        city: "",
        country: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        postcode: "",
        state: "",
        address: "",
      },
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      token: null,
    } as User,
    order: null as any,
    isLoad: false,
    email: "",
    otpCode: "",
    otpErrorMessage: "",
    showOtpForm: false,
    showVerification: false,
    token: null as any,
    loadUserDelete: false as boolean,
  }),

  actions: {
    // Логин пользователя
    async loginUser(data: any) {
      (this.token = data.token),
        (this.user = {
          ...data.user_data,
        });
    },

    // Получение данных пользователя
    async fetchUser() {
      try {
        const response = await api.get(`/users/user-${this.user.ID}.json`);
        this.order = response.data;
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    },

    // Выход из системы
    async logout() {
      try {
        const response = await auth.post("/logout");
        if (response.status === 200) {
          console.log("Пользователь успешно вышел");
        } else {
          console.warn("Ошибка при выполнении logout");
        }
      } catch (error) {
        console.error("Ошибка выполнения запроса logout:", error);
      } finally {
        // Сброс всех полей состояния
        this.user = {
          ID: 0,
          billing: {
            address: "",
            address_1: "",
            address_2: "",
            city: "",
            country: "",
            email: "",
            first_name: "",
            last_name: "",
            phone: "",
            postcode: "",
            state: "",
          },
          shipping: {
            address: "",
            address_1: "",
            address_2: "",
            city: "",
            country: "",
            email: "",
            first_name: "",
            last_name: "",
            phone: "",
            postcode: "",
            state: "",
          },
          email: "",
          username: "",
          first_name: "",
          last_name: "",
          token: null,
        };
        this.token = null;
        this.order = null;
        this.isLoad = false;
        this.email = "";
        this.otpCode = "";
        this.otpErrorMessage = "";
        this.showOtpForm = false;
        this.showVerification = false;

        // Очистка хранилища Pinia с персистенцией
        localStorage.removeItem("users"); // Удаляем данные из localStorage
        sessionStorage.removeItem("users"); // Если есть в sessionStorage, удаляем и оттуда

        // Если требуется, можно добавить перезагрузку страницы для полного сброса состояния
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
    },

    // Отправка OTP на email
    async sendOTP() {
      try {
        this.isLoad = true;
        const response = await auth.post("/send-otp", { email: this.email });
        this.showOtpForm = true;
        this.otpErrorMessage = "";
      } catch (error: any) {
        console.error(
          "Ошибка отправки OTP:",
          error.response?.data?.message || error.message
        );
      } finally {
        this.isLoad = false;
      }
    },

    // Повторная отправка OTP
    async resendOTP() {
      try {
        this.isLoad = true;
        const response = await auth.post("/resend-otp", { email: this.email });
        console.log("OTP отправлен повторно:", response.data);
        this.showOtpForm = true;
        this.otpErrorMessage = "";
      } catch (error: any) {
        console.error(
          "Ошибка повторной отправки OTP:",
          error.response?.data?.message || error.message
        );
      } finally {
        this.isLoad = false;
      }
    },

    // Верификация OTP
    async verifyOTP() {
      const { closeAllModals } = useModalStore();
      try {
        this.isLoad = true;
        const response = await auth.post("/verify-otp", {
          email: this.email,
          otp_code: this.otpCode,
        });

        if (response.data) {
          await this.loginUser(response.data); // Авторизация пользователя
          this.otpErrorMessage = "";

          // Если у пользователя нет имени, показываем форму для заполнения данных
          if (!this.user?.billing.first_name) {
            this.showVerification = true;
          } else {
            closeAllModals();
          }
        }
      } catch (error: any) {
        this.otpErrorMessage =
          error.response?.data?.message || "Неверный код OTP";
        console.error(
          "Ошибка верификации OTP:",
          error.response?.data?.message || error.message
        );
      } finally {
        this.isLoad = false;
      }
    },

    // Обновление профиля пользователя (имя, телефон и адресные данные)
    // async handleNextStep(delivery: any = {}) {
    //   const { closeAllModals } = useModalStore();
    //   try {
    //     this.isLoad = true; // Включаем прелоадер

    //     // Формируем данные для отправки
    //     const payload = {
    //       email: this.email,
    //       name: this.user.billing.first_name,
    //       phone: this.user.billing.phone,
    //       state: delivery.state || null,
    //       country: delivery.country || null,
    //       postcode: delivery.postcode || null,
    //       city: delivery.city || null,
    //       address: delivery.address || null,
    //     };

    //     // Фильтруем null значения, чтобы не отправлять ненужные поля
    //     const filteredPayload = Object.fromEntries(
    //       Object.entries(payload).filter(([_, v]) => v != null)
    //     );

    //     // Запрос на обновление профиля
    //     const response = await auth.post("/update-profile", filteredPayload);

    //     if (response.data && response.data.updated_data) {
    //       // Обновляем состояние `user` с новыми данными
    //       this.user = response.data.updated_data;
    //       this.user = {
    //         ...this.user,
    //         email: response.data.updated_data.email,
    //         first_name: response.data.updated_data.first_name,
    //         last_name: response.data.updated_data.last_name,
    //       };

    //       closeAllModals();
    //     } else {
    //       console.warn(
    //         "Не удалось обновить профиль: данные отсутствуют в ответе"
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Ошибка при обновлении профиля:", error);
    //   } finally {
    //     this.isLoad = false; // Отключаем прелоадер
    //   }
    // },

    async handleNextStep(delivery: any = {}) {
      const { closeAllModals } = useModalStore();
      try {
        this.isLoad = true; // Включаем прелоадер

        // Формируем данные для отправки
        const payload = {
          email: this.email,
          name: this.user.billing.first_name,
          phone: this.user.billing.phone,
          state: delivery.state || null,
          country: delivery.country || null,
          postcode: delivery.postcode || null,
          city: delivery.city || null,
          address: delivery.address || null,
        };

        // Фильтруем null значения, чтобы не отправлять ненужные поля
        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(([_, v]) => v != null)
        );

        // Запрос на обновление профиля
        const response = await auth.post("/update-profile", filteredPayload);

        if (response.data && response.data.updated_data) {
          // Обновляем только те поля, которые пришли в ответе
          const updatedData = response.data.updated_data;

          this.user = updatedData;

          this.user = {
            ...this.user,
            email: updatedData.email || this.user.email,
            first_name: updatedData.first_name || this.user.first_name,
            last_name: updatedData.last_name || this.user.last_name,
          };

          closeAllModals();
        } else {
          console.warn(
            "Не удалось обновить профиль: данные отсутствуют в ответе"
          );
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Если ошибка 404, записываем данные напрямую в store
          this.user.billing = {
            state: delivery.state || null,
            country: delivery.country || null,
            postcode: delivery.postcode || null,
            city: delivery.city || null,
            address: delivery.address || null,
          };
          this.user.shipping = {
            state: delivery.state || null,
            country: delivery.country || null,
            postcode: delivery.postcode || null,
            city: delivery.city || null,
            address: delivery.address || null,
          };

          console.info("Пользователь не найден, данные сохранены локально.");
        } else {
          console.error("Ошибка при обновлении профиля:", error);
        }
      } finally {
        this.isLoad = false; // Отключаем прелоадер
      }
    },

    // Удаление пользователя

    async deleteUser() {
      this.loadUserDelete = true;
      try {
        await auth.delete("/delete-account");
      } catch (error) {
        this.loadUserDelete = false;
      } finally {
        this.loadUserDelete = false;
        this.logout();
      }
    },
  },

  persist: true,
});

export const useUserStoreRefs = () => storeToRefs(useUserStore());
