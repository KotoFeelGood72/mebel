import { ref, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";

export function useProductVariation(productData: any) {
  const toast = useToast();
  const { addCart, removeCart, updateCartItem } = useCartStore();
  const { carts } = useCartStoreRefs();

  // Используем productData напрямую как ref
  // const product = productData;
  const selectedColor = ref<any>(null);

  // console.log(productData)

  // Отслеживание изменений product, чтобы обновлять данные, когда product обновится
  watch(
    productData,
    (newProduct) => {
      if (newProduct && newProduct.attributes) {
        selectedColor.value = newProduct.attributes.pa_colors?.[0] || null;
      }
    },
    { immediate: true } // Запускаем немедленно, чтобы получить начальное значение
  );

  const findVariation = computed(() => {
    if (!productData.value || !selectedColor.value) return null;

    const selectedColorLower = selectedColor.value.toLowerCase();

    return productData.value.variations.find((v: any) => {
      return v.attributes.pa_colors === selectedColorLower;
    });
  });

  const findVariationId = computed(() => findVariation.value?.id || null);

  const variationPrice = computed(
    () => findVariation.value?.price || productData.value?.price || 0
  );

  const isCarts = computed(() =>
    carts.value.some((cart: any) => cart.variationId === findVariationId.value)
  );

  const cartItem = computed(() =>
    carts.value.find((cart: any) => cart.variationId === findVariationId.value)
  );

  const selectedQuantity = ref(cartItem.value ? cartItem.value.quantity : 1);

  const toggleCart = () => {
    const variationId = findVariationId.value;

    if (!variationId) {
      toast.error("Выберите корректную вариацию товара.");
      return;
    }

    if (isCarts.value) {
      removeCart(variationId);
      toast.error("Удалено из корзины");
    } else {
      addCart({
        id: productData.value?.id,
        thumbnail: productData.value?.thumbnail,
        variationId: variationId,
        quantity: selectedQuantity.value,
        color: selectedColor.value,
        price: variationPrice.value,
      });
      toast.success("Добавлено в корзину");
    }
  };

  const updateCart = () => {
    if (isCarts.value) {
      updateCartItem({
        variationId: findVariationId.value,
        quantity: selectedQuantity.value,
      });
    }
  };

  const updateQuantity = (quantity: number) => {
    selectedQuantity.value = quantity;
    updateCart();
  };

  return {
    selectedColor,
    variationPrice,
    isCarts,
    cartItem,
    selectedQuantity,
    toggleCart,
    updateQuantity,
    findVariationId,
    removeCart,
  };
}
