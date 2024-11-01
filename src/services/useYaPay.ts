// import { ref } from "vue";

// interface PaymentSessionParams {
//   amount: number;
//   widgetContainerId: string;
// }

// export function useYaPay() {
//   const activeSession = ref<any>(null);
//   const YaPay = window.YaPay;
//   // Функция для уничтожения сессии
//   function destroySession(): void {
//     if (activeSession.value) {
//       try {
//         activeSession.value.destroy();
//         activeSession.value = null;
//       } catch (error) {
//         console.error("Ошибка при уничтожении сессии:", error);
//       }
//     }
//   }

//   // Монтирование виджета
//   function mountWidget(widgetContainerId: string): void {
//     const widgetContainer = document.querySelector(
//       widgetContainerId
//     ) as HTMLElement;
//     if (widgetContainer && activeSession.value) {
//       widgetContainer.innerHTML = ""; // Очищаем контейнер перед монтированием нового виджета
//       activeSession.value.mountWidget(widgetContainer, {
//         widgetType: YaPay.WidgetType.BnplPreview, // Виджет рассрочки BnplPreview
//         padding: YaPay.WidgetPaddingType.Default,
//       });
//     } else {
//       console.error(`Контейнер виджета с ID "${widgetContainerId}" не найден.`);
//     }
//   }

//   // Функция создания платежной сессии для виджета рассрочки
//   async function createPaymentSession({
//     amount,
//     widgetContainerId,
//   }: PaymentSessionParams): Promise<void> {
//     try {
//       if (!YaPay) {
//         console.error("YaPay SDK не загружен");
//         return;
//       }

//       destroySession(); // Уничтожаем существующую сессию перед созданием новой

//       const paymentData = {
//         env: YaPay.PaymentEnv.Sandbox,
//         version: 4,
//         currencyCode: YaPay.CurrencyCode.Rub,
//         merchantId: "4d715c56-1ac9-49bc-9330-889e3487b2c1",
//         totalAmount: amount, // Используем переданную сумму
//         availablePaymentMethods: ["SPLIT"], // Только метод "SPLIT"
//       };

//       // Обработчик на ошибки при открытии формы оплаты
//       function onFormOpenError(reason: any) {
//         console.error(`Payment error — ${reason}`);
//       }

//       // Создаем сессию и сразу монтируем виджет рассрочки
//       activeSession.value = await YaPay.createSession(paymentData, {
//         onPayButtonClick: () => {}, // Пустая функция для удовлетворения SDK
//         onFormOpenError: onFormOpenError,
//       });

//       mountWidget(widgetContainerId);
//     } catch (err) {
//       console.error("Ошибка создания сессии", err);
//     }
//   }

//   return {
//     createPaymentSession,
//     resetPaymentSession: destroySession,
//   };
// }

import { useCartStoreRefs } from "@/stores/useCartStore";
import { ref } from "vue";

interface PaymentSessionParams {
  amount: number;
  widgetContainerId: string;
}

export function useYaPay() {
  const { carts } = useCartStoreRefs();
  const activeSession = ref<any>(null);

  // Функция для ожидания загрузки SDK
  async function ensureYaPayIsLoaded(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkYaPay = () => {
        if (window.YaPay) {
          console.log("YaPay SDK загружен");
          resolve();
        } else {
          console.warn("YaPay SDK не загружен, повторная попытка...");
          setTimeout(checkYaPay, 100); // Повторяем проверку каждые 100 мс
        }
      };
      checkYaPay();
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

  // Монтирование виджета
  function mountWidget(widgetContainerId: string): void {
    const widgetContainer = document.querySelector(
      widgetContainerId
    ) as HTMLElement;
    if (widgetContainer && activeSession.value) {
      widgetContainer.innerHTML = ""; // Очищаем контейнер перед монтированием нового виджета
      activeSession.value.mountWidget(widgetContainer, {
        widgetType: window.YaPay.WidgetType.BnplPreview, // Виджет рассрочки BnplPreview
        padding: window.YaPay.WidgetPaddingType.Default,
      });
    } else {
      console.error(`Контейнер виджета с ID "${widgetContainerId}" не найден.`);
    }
  }

  // Функция создания платежной сессии для виджета рассрочки
  async function createPaymentSession({
    amount,
    widgetContainerId,
  }: PaymentSessionParams): Promise<void> {
    try {
      // Убеждаемся, что SDK загружен
      await ensureYaPayIsLoaded();

      destroySession(); // Уничтожаем существующую сессию перед созданием новой

      // Генерация данных о товарах из корзины
      const orderItems = carts.value.map((item: any) => ({
        description: item.name,
        quantity: item.quantity,
        amount: {
          value: item.price,
          currency: "RUB",
        },
      }));

      const paymentData = {
        env: window.YaPay.PaymentEnv.Sandbox,
        version: 4,
        currencyCode: window.YaPay.CurrencyCode.Rub,
        merchantId: "4d715c56-1ac9-49bc-9330-889e3487b2c1",
        totalAmount: amount, // Используем переданную сумму
        availablePaymentMethods: ["SPLIT"], // Только метод "SPLIT"
        orderItems,
      };

      // Обработчик на ошибки при открытии формы оплаты
      function onFormOpenError(reason) {
        console.error(`Payment error — ${reason}`);
      }

      // Создаем сессию и сразу монтируем виджет рассрочки
      activeSession.value = await window.YaPay.createSession(paymentData, {
        onPayButtonClick: () => {}, // Пустая функция для удовлетворения SDK
        onFormOpenError: onFormOpenError,
      });

      mountWidget(widgetContainerId);
    } catch (err) {
      console.error("Ошибка создания сессии", err);
    }
  }

  return {
    createPaymentSession,
    resetPaymentSession: destroySession,
  };
}
