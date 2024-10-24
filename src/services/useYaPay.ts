import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";
import { ref } from "vue";

type PaymentMethods = "SPLIT" | "CARD";

interface PaymentSessionParams {
  amount: number;
  methods: PaymentMethods[];
  buttonContainerId: string;
  widgetContainerId?: string;
}

export function useYaPay() {
  const { createOrder } = useCartStore();
  const { carts } = useCartStoreRefs();
  const activeSession = ref<any>(null);
  const YaPay = window.YaPay;

  const buttonContainerCache: Map<string, HTMLElement> = new Map();
  const widgetContainerCache: Map<string, HTMLElement> = new Map();

  // Функция для загрузки скрипта SDK Яндекс Пэй
  async function loadYaPayScript(): Promise<void> {
    if (YaPay) {
      return Promise.resolve(); // SDK уже загружен
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://pay.yandex.ru/sdk/v1/pay.js";
      script.async = true;

      script.onload = () => {
        console.log("Yandex Pay SDK загружен");
        resolve();
      };

      script.onerror = () => {
        console.error("Ошибка при загрузке Yandex Pay SDK");
        reject(new Error("Ошибка при загрузке Yandex Pay SDK"));
      };

      document.head.appendChild(script);
    });
  }

  // Функция для уничтожения сессии
  function destroySession(): void {
    if (activeSession.value) {
      try {
        activeSession.value.destroy();
        activeSession.value = null;
      } catch (error) {
        console.error("Ошибка при уничтожении сессии:", error);
      }
    }
  }

  // Универсальная функция для поиска и кэширования контейнеров
  function getCachedElement(
    cache: Map<string, HTMLElement>,
    selector: string
  ): HTMLElement | undefined {
    if (!cache.has(selector)) {
      const element = document.querySelector(selector);
      if (element) {
        cache.set(selector, element as HTMLElement);
      } else {
        console.error(`Элемент с селектором ${selector} не найден`);
      }
    }
    return cache.get(selector);
  }

  // Монтирование кнопки оплаты
  function mountPayButton(buttonContainerId: string, methods: any[]): void {
    const buttonContainer = getCachedElement(
      buttonContainerCache,
      buttonContainerId
    );
    if (buttonContainer && activeSession.value) {
      activeSession.value.mountButton(buttonContainer, {
        type: methods.includes("SPLIT")
          ? YaPay.ButtonType.Split
          : YaPay.ButtonType.Pay,
        theme: YaPay.ButtonTheme.Black,
        width: YaPay.ButtonWidth.Auto,
      });
    }
  }

  // Монтирование виджета, если используется метод SPLIT
  function mountWidget(widgetContainerId: string): void {
    const widgetContainer = getCachedElement(
      widgetContainerCache,
      widgetContainerId
    );
    if (widgetContainer && activeSession.value) {
      widgetContainer.innerHTML = ""; // Очищаем контейнер перед монтированием нового виджета
      activeSession.value.mountWidget(widgetContainer, {
        widgetType: YaPay.WidgetType.Info,
        widgetTheme: YaPay.WidgetTheme.Light,
        borderRadius: 8,
      });
    }
  }

  // Функция создания платежной сессии
  async function createPaymentSession({
    amount,
    methods,
    buttonContainerId,
    widgetContainerId,
  }: any): Promise<void> {
    try {
      // Загружаем SDK, если он не загружен
      await loadYaPayScript();

      if (!window.YaPay) {
        console.error("YaPay SDK не загружен");
        return;
      }

      destroySession(); // Уничтожаем существующую сессию перед созданием новой

      // Генерация данных о товарах из корзины
      const orderItems = carts.value.map((item: any) => ({
        description: item.name, // Название товара
        quantity: item.quantity, // Количество товара
        amount: {
          value: item.price, // Цена за единицу
          currency: "RUB", // Валюта
        },
      }));

      const paymentData = {
        env: window.YaPay.PaymentEnv.Sandbox,
        version: 4,
        currencyCode: YaPay.CurrencyCode.Rub,
        merchantId: "4d715c56-1ac9-49bc-9330-889e3487b2c1",
        totalAmount: amount,
        availablePaymentMethods: ["SPLIT"],
        orderItems, // Товары из корзины
      };

      activeSession.value = await YaPay.createSession(paymentData, {
        onPayButtonClick: createOrder, // Запуск createOrder при нажатии на кнопку
      });

      // Монтируем кнопку
      mountPayButton(buttonContainerId, methods);

      // Если используется SPLIT, монтируем виджет
      if (methods.includes("SPLIT") && widgetContainerId) {
        mountWidget(widgetContainerId);
      }
    } catch (err) {
      console.error("Ошибка создания сессии", err);
    }
  }

  // Функция удаления кнопки и пересоздания новой
  function resetPaymentButton(
    buttonContainerId: string,
    amount: number,
    methods: PaymentMethods[]
  ): void {
    const buttonContainer = getCachedElement(
      buttonContainerCache,
      buttonContainerId
    );

    if (activeSession.value && buttonContainer) {
      try {
        // Удаляем старую кнопку перед монтированием новой
        activeSession.value.unmountButton(buttonContainer);
      } catch (error) {
        console.error("Ошибка при удалении кнопки:", error);
      }
    }

    // Пересоздаем сессию и монтируем новую кнопку
    createPaymentSession({ amount, methods, buttonContainerId });
  }

  return {
    createPaymentSession,
    resetPaymentSession: destroySession,
    resetPaymentButton,
  };
}
