import { ref } from "vue";
import axios from "axios";
import deliveryData from "@/data/DeliveryPrice.json";

const query = ref<any>("");
const suggestions = ref<any>([]);
const selectedAddress = ref<any>("");
const destinationCoordinates = ref<any>(null);
const deliveryPrice = ref(0);

export const useDelivery = () => {
  const fetchSuggestions = async () => {
    if (query.value.length > 1) {
      try {
        const response = await axios.post(
          "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
          {
            query: query.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token cab538d49b7cbc9ae1d154721028bbbbb0130b57`,
            },
          }
        );
        suggestions.value = response.data.suggestions;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      suggestions.value = [];
    }
  };

  const selectSuggestion = (suggestion: any) => {
    query.value = suggestion.value;
    selectedAddress.value = JSON.stringify(suggestion.data);
    destinationCoordinates.value =
      suggestion.data.geo_lat && suggestion.data.geo_lon
        ? [suggestion.data.geo_lon, suggestion.data.geo_lat]
        : null;
    suggestions.value = [];

    // Вызываем расчет доставки
    calculateDeliveryPrice();
  };

  const calculateDeliveryPrice = () => {
    const addressData = JSON.parse(selectedAddress.value);
    let price = 0;

    // Проверяем наличие города или области в предопределенных списках
    if (
      addressData.region_with_type.includes("Москва") ||
      addressData.region_with_type.includes("Московская обл")
    ) {
      price = deliveryData.regions["Москва и Московская область"].price;
    } else {
      Object.keys(deliveryData.regions).forEach((region: any) => {
        const regionData = deliveryData.regions[region];
        if (regionData.cities && regionData.cities[addressData.city]) {
          price = regionData.cities[addressData.city];
        }
      });
    }

    // Если цена не установлена, считаем по километрам
    if (price === 0 && destinationCoordinates.value) {
      const defaultPrice = deliveryData.default;
      const distanceKm = calculateDistanceFromCoordinates(
        destinationCoordinates.value
      );
      price = defaultPrice.base_price + distanceKm * defaultPrice.price_per_km;
    }

    deliveryPrice.value = price;
  };

  const calculateDistanceFromCoordinates = (coordinates: [number, number]) => {
    const exampleDistanceKm = 10; // Placeholder: добавить реальный расчет дистанции
    return exampleDistanceKm;
  };

  return {
    query,
    suggestions,
    selectedAddress,
    destinationCoordinates,
    deliveryPrice,
    fetchSuggestions,
    selectSuggestion,
    calculateDeliveryPrice,
  };
};
