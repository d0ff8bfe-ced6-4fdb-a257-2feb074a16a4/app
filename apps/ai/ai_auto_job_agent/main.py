from gpt4free import G4FLLM
from langchain.llms.base import LLM
from g4f import Provider, models
import mysql.connector
from mysql.connector import Error
import time

def ProcessTextDB(text, id=1):
    llm: LLM = G4FLLM(
        model=models.gpt_35_turbo,
        # provider=Provider.Aichat,
    )

    print(f"Processing text: {text}")
    MSG = f"""
        Answer as an analyst would answer. Always answer in Russian Language. My message for you: {text}. If you need, you can write HTML code with tailwind for difficult view or bootstrap for usual basics css styles, this code will be rendered for me. Do not use Markdown, LATeX, use only html and text. Always answer using HTML code. you will communicate with the employees of the construction company and you should be a useful assistant. 
    """
    
    res = llm(MSG)
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
            query = ("SELECT id, request FROM message_jobs "
                     "WHERE is_done = False AND is_send_to_processing = False "
                     "LIMIT 1")
            cursor.execute(query)

            # Fetch one record
            record = cursor.fetchone()
            print(f"Fetched record: {record}")

            if record:
                id, request = record

                # Update is_sended to True for the fetched record
                update_query = ("UPDATE message_jobs SET is_send_to_processing = True "
                                "WHERE request = %s")
                cursor.execute(update_query, (request,))
                connection.commit()

                # Call the ProcessTextDB function
                answer = ProcessTextDB(request)

                # Update is_processed to True and request field for the fetched record
                update_query = ("UPDATE message_jobs SET is_done = True, response = %s "
                                "WHERE request = %s")
                cursor.execute(update_query, (answer, request))
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
