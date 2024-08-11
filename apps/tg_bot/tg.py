import time
from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext

# Команда start
async def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    # 10-секундная пауза
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Инициализация началась...")
    time.sleep(10)
    # Отправка сообщения об инициализации пользователя
    await context.bot.send_message(chat_id=update.effective_chat.id, text=f"Инициализирован пользователь: {user.first_name} {user.last_name}, уведомлений 0.")
    # 15-секундная пауза
    time.sleep(15)
    # Отправка уведомления
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Уведомление: заполните отчет.")

def main() -> None:
    # Здесь вставьте ваш токен
    application = Application.builder().token("7321399065:AAE1UAdIpV3bvtdm6_kUjpDOc8zJd1Qtlvw").build()

    # Регистрируем команду /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    application.run_polling()

if __name__ == '__main__':
    main()
