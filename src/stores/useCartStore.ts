import { defineStore, storeToRefs } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("carts", {
  state: () => ({
    carts: [] as any,
    paymentMethod: "Оплатить" as any,
    currentOrder: {} as any,
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

    // Измененный метод removeCart с учетом цвета
    // removeCart(id: string, color: string) {
    //   const existingCartItem = this.carts.find(
    //     (cart: any) => cart.id === id && cart.color === color
    //   );
    //   if (existingCartItem) {
    //     if (existingCartItem.quantity > 1) {
    //       existingCartItem.quantity -= 1;
    //     } else {
    //       this.carts = this.carts.filter(
    //         (cart: any) => !(cart.id === id && cart.color === color)
    //       );
    //     }
    //   }
    // },

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
      try {
        const response = await axios.post(
          "https://fu.gleede.ru/wp-json/yandexpay/v1/create-order/",
          this.currentOrder
        );

        if (response.data && response.data.payment_url) {
          window.location.href = response.data.payment_url;
        }

        // Очистка корзины и сброс текущего заказа
        this.carts = [];
        this.currentOrder = {
          line_items: [],
          price: 0,
        };
      } catch (error) {
        console.error("Ошибка при создании заказа:", error);
      }
    },
  },
  persist: true,
});

export const useCartStoreRefs = () => storeToRefs(useCartStore());
