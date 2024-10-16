import { useCartStore } from "~/store/useCartStore";

export function useYaPay() {
  const { createOrder } = useCartStore();
  const activeSession = ref(null);

  // Функция создания платежной сессии
  function createPaymentSession({
    amount,
    methods,
    buttonContainerId,
    widgetContainerId,
  }) {
    // Если сессия уже существует, удаляем её и кнопки
    if (activeSession.value) {
      try {
        activeSession.value.destroy(); // Удаляем сессию и все связанные кнопки и виджеты
      } catch (error) {
        console.error("Ошибка при уничтожении сессии:", error);
      }
      activeSession.value = null;
    }

    const paymentData = {
      env: window.YaPay.Sandbox,
      version: 4,
      currencyCode: window.YaPay.CurrencyCode.Rub,
      merchantId: "4d715c56-1ac9-49bc-9330-889e3487b2c1",
      totalAmount: amount,
      availablePaymentMethods: methods,
    };

    console.log(paymentData.totalAmount);
    window.YaPay.createSession(paymentData, {
      onPayButtonClick: async () => {
        createOrder();
      },
    })
      .then((paymentSession) => {
        activeSession.value = paymentSession;

        // Монтируем кнопку
        const buttonContainer = document.querySelector(buttonContainerId);
        if (buttonContainer) {
          activeSession.value.mountButton(buttonContainer, {
            type: methods.includes("SPLIT")
              ? window.YaPay.ButtonType.Split
              : window.YaPay.ButtonType.Pay,
            theme: window.YaPay.ButtonTheme.Black,
            width: window.YaPay.ButtonWidth.Auto,
          });
        } else {
          console.error("Контейнер для кнопки не найден:", buttonContainerId);
        }

        // Если метод SPLIT, также монтируем виджет
        if (methods.includes("SPLIT")) {
          const widgetContainer = document.querySelector(widgetContainerId);
          if (widgetContainer) {
            // Очищаем контейнер перед монтированием нового виджета
            widgetContainer.innerHTML = "";

            activeSession.value.mountWidget(widgetContainer, {
              widgetType: window.YaPay.WidgetType.Info,
              widgetTheme: window.YaPay.WidgetTheme.Light,
              borderRadius: 8,
            });
          } else {
            console.error(
              "Контейнер для виджета не найден:",
              widgetContainerId
            );
          }
        }
      })
      .catch((err) => {
        console.error("Ошибка создания сессии", err);
      });
  }

  // Функция удаления активной сессии и кнопок
  function resetPaymentSession() {
    if (activeSession.value) {
      try {
        activeSession.value.destroy(); // Попробуйте добавить блок try-catch для отлова ошибок
      } catch (error) {
        console.error("Ошибка при уничтожении сессии:", error);
      }
      activeSession.value = null;
    }
  }

  // Функция удаления кнопки и пересоздания новой
  function resetPaymentButton(buttonContainerId, amount, methods) {
    const buttonContainer = document.querySelector(buttonContainerId);

    if (activeSession.value && buttonContainer) {
      try {
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
    resetPaymentSession,
    resetPaymentButton, // Добавляем функцию в возвращаемый объект
  };
}
