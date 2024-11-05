// Создаем composable для отправки данных в Telegram-бота
export function useTelegramBot() {
  const sendMessage = async (message: any) => {
    const botToken = "8048487916:AAFismqdRc2IV_l3tW8lWoPtHz7Sg-OPOhc";
    const chatId = "-4538996700";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка при отправке сообщения в Telegram:", errorData);
        return { success: false, error: errorData };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      console.error("Ошибка:", err);
      return { success: false, error: err };
    }
  };

  return { sendMessage };
}
