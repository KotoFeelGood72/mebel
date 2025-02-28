import { ref, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";

export function useProductVariation(productData: any) {
  const toast = useToast();
  const { addCart, removeCart, updateCartItem } = useCartStore();
  const { carts } = useCartStoreRefs();

  const selectedColor = ref<any>(null);
  const selectedType = ref("Сшитые");
  watch(
    productData,
    (newProduct) => {
      if (
        newProduct &&
        newProduct.variations &&
        newProduct.variations.length > 0
      ) {
        selectedColor.value =
          newProduct.variations[0].attributes.pa_colors || null;
      } else {
        selectedColor.value = null;
      }
    },
    { immediate: true }
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

  const variationStock = computed(() => findVariation.value?.stock_status);

  const variationSalePrice = computed(() => {
    return findVariation.value?.regular_price;
  });
  const boolSalePrice = computed(() => {
    return !!findVariation.value?.sale_price;
  });

  const isCarts = computed(() =>
    carts.value.some((cart: any) => cart.variationId === findVariationId.value)
  );

  const cartItem = computed(() =>
    carts.value.find((cart: any) => cart.variationId === findVariationId.value)
  );

  const selectedQuantity = ref(cartItem.value ? cartItem.value.quantity : 1);

  const toggleCart = () => {
    const variationId = findVariationId.value;

    console.log(variationId);

    if (!variationId) {
      toast.error("Выберите корректную вариацию товара.");
      return;
    }
    const variationThumbnail = findVariation.value?.gallery_images?.[0] || "";
    if (isCarts.value) {
      removeCart(variationId);
      toast.error("Удалено из корзины");
    } else {
      addCart({
        id: productData.value?.id,
        thumbnail: variationThumbnail,
        variationId: variationId,
        quantity: selectedQuantity.value,
        color: selectedColor.value,
        price: variationPrice.value,
        title: productData.value.title,
        type: selectedType.value,
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
    variationStock,
    variationSalePrice,
    isCarts,
    cartItem,
    selectedQuantity,
    toggleCart,
    updateQuantity,
    findVariationId,
    boolSalePrice,
    removeCart,
    selectedType,
  };
}
