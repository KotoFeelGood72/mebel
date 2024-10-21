import { ref } from "vue";
import axios from "axios";

// Интерфейсы для типизации данных доставки
interface CityPrices {
  [city: string]: number;
}

interface Region {
  price: number;
  cities?: CityPrices;
}

interface DeliveryData {
  regions: {
    [region: string]: Region;
  };
  default: {
    base_price: number;
    price_per_km: number;
  };
}

const query = ref<string>("");
const suggestions = ref<any[]>([]);
const selectedAddress = ref<string>("");
const destinationCoordinates = ref<[number, number] | null>(null);
const deliveryPrice = ref<number>(0);

// Явная типизация deliveryData
const deliveryData = ref<DeliveryData>({
  regions: {
    "Москва и Московская область": {
      price: 1500,
      cities: {
        Москва: 1500,
        Мытищи: 1000,
        Химки: 1000,
      },
    },
    "Крупные города": {
      price: 1000,
      cities: {
        "Санкт-Петербург": 1000,
        Казань: 1000,
        Новосибирск: 1000,
        Екатеринбург: 1000,
      },
    },
  },
  default: {
    base_price: 500,
    price_per_km: 20,
  },
});

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
      price = deliveryData.value.regions["Москва и Московская область"].price;
    } else {
      Object.keys(deliveryData.value.regions).forEach((region: string) => {
        const regionData = deliveryData.value.regions[region];
        if (regionData.cities && regionData.cities[addressData.city]) {
          price = regionData.cities[addressData.city];
        }
      });
    }

    // Если цена не установлена, считаем по километрам
    if (price === 0 && destinationCoordinates.value) {
      const defaultPrice = deliveryData.value.default;
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
