import { defineStore, storeToRefs } from "pinia";
import { useUserStoreRefs } from "./useUserStore";
import { useToast } from "vue-toastification";
import axios from "axios";

export const useCartStore = defineStore("carts", {
  state: () => ({
    carts: [] as any,
    paymentMethod: "Оплатить" as any,
    currentOrder: {} as any,
    isRedirectingToPayment: false as boolean,
  }),
  actions: {
    setPaymentMethod(methods: any) {
      this.paymentMethod = methods;
    },

    addCart(item: any) {
      const existingCartItem = this.carts.find(
        (cart: any) => cart.id === item.id && cart.color === item.color
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        this.carts.push({ ...item, quantity: 1 });
      }
    },

    removeCart(variationId: string) {
      const existingCartItem = this.carts.find(
        (cart: any) => cart.variationId === variationId
      );

      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
        } else {
          this.carts = this.carts.filter(
            (cart: any) => cart.variationId !== variationId
          );
        }
      }
    },

    updateCartItem(updatedItem: any) {
      const existingCartItem = this.carts.find(
        (cart: any) =>
          cart.id === updatedItem.id && cart.color === updatedItem.color
      );
      if (existingCartItem) {
        existingCartItem.quantity =
          updatedItem.quantity || existingCartItem.quantity;
        existingCartItem.color = updatedItem.color || existingCartItem.color;
        existingCartItem.price = updatedItem.price || existingCartItem.price;
      }
    },

    removeCartItem(itemId: string) {
      this.carts = this.carts.filter((cart: any) => cart.id !== itemId);
    },

    async createOrder() {
      const { user } = useUserStoreRefs();
      const toast = useToast();
      this.currentOrder.billing = {
        ...this.currentOrder.billing,
        first_name: user.value.billing.first_name,
        phone: user.value.billing.phone,
        email: user.value.billing.email,
        address_1: user.value.billing.address,
      };
      try {
        const response = await axios.post(
          "https://softpear.ru/wp-json/yandexpay/v1/create-order/",
          this.currentOrder
        );

        if (response.data.payment_url) {
          this.isRedirectingToPayment = true;
          window.location.href = response.data.payment_url;
        }

        this.carts = [];
        this.currentOrder = {
          line_items: [],
          price: 0,
        };
      } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        toast.error(
          "Ошибка при создании заказа: Неверный адрес эл. почты для выставления счета"
        );
        this.isRedirectingToPayment = false;
      }
    },
  },
  persist: true,
});

export const useCartStoreRefs = () => storeToRefs(useCartStore());
