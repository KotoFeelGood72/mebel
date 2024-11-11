import { useCartStoreRefs } from "@/stores/useCartStore";
import { ref, shallowRef } from "vue";

interface PaymentSessionParams {
  amount: number;
  widgetContainerId: string;
}

export function useYaPay() {
  const { carts } = useCartStoreRefs();
  const activeSession = shallowRef<any>(null);

  // Функция для ожидания загрузки SDK
  async function ensureYaPayIsLoaded(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkYaPay = () => {
        if (window.YaPay) {
          console.log("YaPay SDK загружен");
          resolve();
        } else {
          console.warn("YaPay SDK не загружен, повторная попытка...");
          setTimeout(checkYaPay, 100);
        }
      };
      checkYaPay();
    });
  }

  async function destroySession(): Promise<void> {
    if (activeSession.value) {
      try {
        await activeSession.value.destroy();
        activeSession.value = null;
      } catch (error) {
        console.error("Ошибка при уничтожении сессии:", error);
      }
    }
  }

  function mountWidget(widgetContainerId: string): void {
    const widgetContainer = document.querySelector(
      widgetContainerId
    ) as HTMLElement;
    if (widgetContainer && activeSession.value) {
      widgetContainer.innerHTML = "";
      activeSession.value.mountWidget(widgetContainer, {
        widgetType: window.YaPay.WidgetType.BnplPreview,
        padding: window.YaPay.WidgetPaddingType.Default,
      });
    } else {
      console.error(`Контейнер виджета с ID "${widgetContainerId}" не найден.`);
    }
  }

  async function createPaymentSession({
    amount,
    widgetContainerId,
  }: PaymentSessionParams): Promise<void> {
    try {
      // Убеждаемся, что SDK загружен
      await ensureYaPayIsLoaded();

      destroySession();
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
        totalAmount: amount,
        availablePaymentMethods: ["SPLIT"],
        orderItems,
      };

      function onFormOpenError(reason: any) {
        console.error(`Payment error — ${reason}`);
      }

      activeSession.value = await window.YaPay.createSession(paymentData, {
        onPayButtonClick: () => {},
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
