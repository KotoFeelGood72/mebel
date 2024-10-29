import { defineStore, storeToRefs } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("carts", {
  state: () => ({
    carts: [] as any,
    paymentMethod: "Оплата картой онлайн или через СБП" as any,
    currentOrder: {} as any,
  }),
  actions: {
    setPaymentMethod(methods: any) {
      this.paymentMethod = methods;
    },
    addCart(item: any) {
      console.log(item);
      const existingCartItem = this.carts.find(
        (cart: any) => cart.id === item.id
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        this.carts.push({ ...item, quantity: 1 });
      }
    },
    removeCart(item: any) {
      const existingCartItem = this.carts.find(
        (cart: any) => cart.id === item.id
      );
      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
        } else {
          this.carts = this.carts.filter((cart: any) => cart.id !== item.id);
        }
      }
    },
    updateCartItem(updatedItem: any) {
      const existingCartItem = this.carts.find(
        (cart: any) => cart.id === updatedItem.id
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
        const response = axios.post(
          "https://fu.gleede.ru/wp-json/yandexpay/v1/create-order/",
          this.currentOrder
        );
      } catch (error) {}
    },
  },
  persist: true,
});

export const useCartStoreRefs = () => storeToRefs(useCartStore());
