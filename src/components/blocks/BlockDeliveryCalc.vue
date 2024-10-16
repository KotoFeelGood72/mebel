<template>
  <div class="delivery">
    <div class="delivery__address">
      <h3>Доставка</h3>
      <p>Адрес</p>
      <input
        type="text"
        v-model="query"
        @input="fetchSuggestions"
        placeholder="Введите адрес"
      />
      <ul class="delivery_siqqestion" v-if="suggestions.length">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDelivery } from "@/composables/useDelivery";
import { useCartStoreRefs } from "@/stores/useCartStore";
import { watch } from "vue";

const {
  query,
  suggestions,
  deliveryPrice,
  fetchSuggestions,
  selectSuggestion,
  selectedAddress,
} = useDelivery();
const { currentOrder } = useCartStoreRefs();

watch([selectedAddress], (newAddress) => {
  const addressData = JSON.parse(newAddress);
  currentOrder.value = {
    ...currentOrder.value,
    shipping: {
      ...currentOrder.value.shipping,
      address_1: `${addressData.street_with_type || ""} ${
        addressData.house || ""
      }`,
      city: addressData.city || "",
      postcode: addressData.postal_code || "",
      country: addressData.country_iso_code || "RU",
      region: addressData.region_with_type || "",
      price: deliveryPrice.value,
    },
    billing: {
      ...currentOrder.value.billing,
      address_1: `${addressData.street_with_type || ""} ${
        addressData.house || ""
      }`,
      city: addressData.city || "",
      postcode: addressData.postal_code || "",
      country: addressData.country_iso_code || "RU",
      region: addressData.region_with_type || "",
    },
  };
});
</script>

<style scoped lang="scss">
.delivery {
  background-color: $white;
  padding: 1.7rem 2.4rem 3.4rem 2.4rem;
  @include bp($point_2) {
    padding: 1.5rem;
  }

  h3 {
    font-size: 3rem;
    margin-bottom: 3rem;
    font-weight: 500;
    font-family: $font_2;
    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
  .delivery__address {
    max-width: 53.6rem;
    margin-bottom: 4rem;
    position: relative;
    & > p {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-family: $font_2;
    }

    input {
      @include app;
      width: 100%;
      min-height: 4.8rem;
      border: 0.1rem solid #b2b2b2;
      padding: 1.2rem 1.5rem;
      font-size: 1.8rem;
    }
  }
}

.delivery_siqqestion {
  position: absolute;
  border: 0.1rem solid #b2b2b2;
  border-top: 0;
  display: flex;
  flex-direction: column;
  background-color: $white;
  max-height: 30rem;
  overflow-y: auto;
  width: 100%;
  background-color: $white;
  z-index: 99;
  li {
    padding: 1.2rem 1.5rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: $light;
    }
  }
  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray;
  }
}

.delivery__method {
  p {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: $dark;
    font-family: $font_2;
  }
}

.delivery__method-item {
  input:checked + label {
    &:after {
      opacity: 1;
      visibility: visible;
    }
  }
  label {
    cursor: pointer;
    @include flex-start;
    position: relative;
    padding-left: 3.1rem;
    font-size: 1.8rem;

    span {
      min-width: 22.8rem;
      margin-right: 3.8rem;
    }

    img {
      width: 5.3rem;
      @include flex-start;
      margin-right: 1rem;
    }
    &:before {
      position: absolute;
      top: 50%;
      left: 0%;
      width: 1.6rem;
      height: 1.6rem;
      border: 0.1rem solid $brown;
      border-radius: 100%;
      content: "";
      transform: translateY(-50%);
    }
    &:after {
      position: absolute;
      top: 50%;
      left: 0.3rem;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      content: "";
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
      background-position: center center;
      background-color: $brown;
      border-radius: 100%;
    }
  }

  input {
    display: none;
  }
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
