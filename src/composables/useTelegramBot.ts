// import { useFetch } from "#app";

// // Создаем composable для отправки данных в Telegram-бота
// export function useTelegramBot() {
//   const sendMessage = async (message) => {
//     const botToken = "8048487916:AAFismqdRc2IV_l3tW8lWoPtHz7Sg-OPOhc";
//     const chatId = "-4538996700";

//     const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

//     try {
//       const { data, error } = await useFetch(url, {
//         method: "POST",
//         body: {
//           chat_id: chatId,
//           text: message,
//           parse_mode: "Markdown",
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (error.value) {
//         console.error("Ошибка при отправке сообщения в Telegram:", error.value);
//         return { success: false, error: error.value };
//       }

//       return { success: true, data: data.value };
//     } catch (err) {
//       console.error("Ошибка:", err);
//       return { success: false, error: err };
//     }
//   };

//   return { sendMessage };
// }
