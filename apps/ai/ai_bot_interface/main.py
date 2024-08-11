from g4f.client import Client
import mysql.connector
from mysql.connector import Error
import time
import requests
import json

def get_documents_list():
    url = "https://dvv2.k-lab.su/api/files/last-versions"
    response = requests.get(url)

    if response.status_code == 200:
        json_data = response.json()
        
        json_string = json.dumps(json_data, indent=4, ensure_ascii=False)
        print(f"Docs: {json_string}")
        return json_string
    else:
        print(f"Ошибка: {response.status_code}")
        return "Произошла ошибка получения данных"

def ai(MSG, model="gpt-4o"):
    client = Client()
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": MSG}],
    )
    res = response.choices[0].message.content
    return res

def ProcessTextDB(text, id=1):

    print(f"Processing text: {text}")
    MSG = f"""
        Answer as an helpfull document analyst would answer. Always answer in Russian Language. My message for you: {text}. If you need, you can write HTML code with tailwind for difficult view or bootstrap for usual basics css styles, this code will be rendered for me. Do not use Markdown, LATeX, use only html and text. Always answer using HTML code. you will communicate with the employees of the construction company and you should be a useful assistant.
    """
    check_work = "что ты"
    if (not check_work.lower() in text.lower()):
        MSG += f"Actual documents list in the company: {get_documents_list()}"

    example = """
    ```html
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Маркетинговая стратегия для найма разнорабочих в строительную компанию</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 text-gray-800">
        <div class="container mx-auto p-6">
            <h1 class="text-3xl font-bold mb-4">Заголовок</h1>
            <p class="mb-4">Обычный текст</p>
            <h2 class="text-2xl font-semibold mb-2">Подзаголовок</h2>
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">Столбец 1</th>
                    <th class="py-2 px-4 border-b">Столбец 2</th>
                    <th class="py-2 px-4 border-b">Столбец 3</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-green-100">
                    <td class="py-2 px-4 border-b"></td>
                    <td class="py-2 px-4 border-b"></td>
                    <td class="py-2 px-4 border-b"></td>
                </tr>
                <tr class="bg-yellow-100">
                    <td class="py-2 px-4 border-b"></td>
                    <td class="py-2 px-4 border-b"></td>
                    <td class="py-2 px-4 border-b"></td>
                </tr>
                <tr class="bg-red-100">
                    <td class="py-2 px-4 border-b"></td>
                    <td class="py-2 px-4 border-b"></td>
                    <td class="py-2 px-4 border-b"></td>
                </tr>
            </tbody>
        </table>
        <h2 class="text-2xl font-semibold mb-2">Загрузка файлов (если требуется):</h2>
        <div class="flex space-x-2">
            <div class="flex flex-col items-center">
                <a href="/path/to/your/file.obj" 
                    download 
                    class="relative inline-flex items-center justify-center w-24 h-24 bg-blue-50 border-2 border-blue-200 ring-2 ring-blue-200 font-bold rounded-lg hover:bg-blue-100 transition duration-300 ease-in-out shadow-lg">
                    <img src="http://localhost:83/file.png" alt="">
                    <svg class="absolute bottom-1 left-1/8 text-blue-300 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                    </svg>                  
                </a>
                <p class="text-gray-700 font-bold">File name 1</p>
            </div>
            <div class="flex flex-col items-center">
                <a href="/path/to/your/file.pdf" 
                    download 
                    class="relative inline-flex items-center justify-center w-24 h-24 bg-blue-50 border-2 border-blue-200 ring-2 ring-blue-200 font-bold rounded-lg hover:bg-blue-100 transition duration-300 ease-in-out shadow-lg">
                    <img src="http://localhost:83/file.png" alt="">
                    <svg class="absolute bottom-1 left-1/8 text-blue-300 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                    </svg>                  
                </a>
                <p class="text-gray-700 font-bold">File name 2</p>
            </div>
        </div>
    </div>
    </body>
    </html>
    ```
        """

    MSG = f"{MSG}. Example: {example}"

    res = ai(MSG, model="gpt-4o")
    warning = "404: Not Found"
    if (not warning.lower() in res.lower()):
        print("gpt-4o model is not available, using gpt-4o model")
        res = ai(MSG, model="gpt-4o")
        if (not warning.lower() in res.lower()):
            print("gpt-4o model is not available, using gpt-3.5-turbo model")
            res = ai(MSG, model="gpt-3.5-turbo")

    print(res)

    return res

def getDBData():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(host='localhost',
                                             database='laravel',
                                             user='sail',
                                             password='password')
        if connection.is_connected():
            cursor = connection.cursor()
            print("Connected to MySQL database")  # Добавлено для логирования

            # Select the first item with is_processed=False and is_sended=False
            query = ("SELECT id, chat_id, text FROM messages "
                     "WHERE is_done = False AND is_send_to_processing = False "
                     "LIMIT 1")
            cursor.execute(query)

            # Fetch one record
            record = cursor.fetchone()
            print(f"Fetched record: {record}")

            if record:
                id, chat_id, text = record

                update_query = ("UPDATE messages SET is_send_to_processing = True "
                                "WHERE text = %s")
                cursor.execute(update_query, (text,))
                connection.commit()

                answer = ProcessTextDB(text, id)

                update_query = ("UPDATE messages SET is_done = True "
                                "WHERE text = %s")
                cursor.execute(update_query, (text,))
                connection.commit()

                insert_query = ("INSERT INTO messages (chat_id, text, actor, is_done, is_send_to_processing) "
                                "VALUES (%s, %s, 'ai', True, True)")
                cursor.execute(insert_query, (chat_id, answer))
                connection.commit()

            else:
                print("No items to process.")

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def main():

    while(True):
        getDBData()
        time.sleep(5)


if __name__ == "__main__":
    main()
