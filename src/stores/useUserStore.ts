import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { auth, api } from "@/api/axios"; // Здесь предполагается, что вы настроили axios-инстанс в файле "@/api/axios".

export const useUserStore = defineStore("users", {
  state: () => ({
    user: null as any,
    data: null as any,
    isLoad: false,
    email: "",
    otpCode: "",
    userData: null as any,
    otpErrorMessage: "",
    showOtpForm: false,
    showVerification: false,
  }),

  actions: {
    // Логин пользователя
    async loginUser(data: any) {
      this.user = data;
      localStorage.setItem("user", JSON.stringify(data));
    },

    // Получение данных пользователя
    async fetchUser(id: string) {
      try {
        const response = await api.get(`/users/user-${id}.json`);
        this.user = response.data;
        console.log("Данные пользователя:", response.data);
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
        this.user = null;
        this.data = null;
        localStorage.removeItem("user");
      }
    },

    // Отправка OTP на email
    async sendOTP() {
      try {
        this.isLoad = true;
        const response = await auth.post("/send-otp", { email: this.email });
        this.showOtpForm = true;
        this.otpErrorMessage = "";
        this.userData = response.data.user_data;
        console.log("OTP отправлен:", response.data);
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
          if (this.userData?.first_name) {
            // location.href = "/";
            this.fetchUser(this.user.user_data.ID);
          } else {
            this.showVerification = true;
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

    // Обновление профиля пользователя (имя и телефон)
    async handleNextStep(data: any) {
      try {
        this.isLoad = true; // Включаем прелоадер
        const response = await auth.post("/update-profile", {
          email: this.email,
          
          name: this.user.user_data.name,
          phone: this.user.user_data.phone,
        });
        console.log("Профиль обновлен", response.data);
        this.fetchUser(this.user.user_data.ID);
        // Перенаправляем пользователя на главную страницу
        // location.href = "/";
      } catch (error) {
        console.error("Ошибка при обновлении профиля:", error);
      } finally {
        this.isLoad = false; // Отключаем прелоадер
      }
    },
  },

  persist: true, // Включение персистентности для сохранения состояния
});

// Хук для использования `storeToRefs` в компонентах
export const useUserStoreRefs = () => storeToRefs(useUserStore());
