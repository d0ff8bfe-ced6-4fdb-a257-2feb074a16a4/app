import os
import torch
import streamlit as st
from pathlib import Path

from dotenv import load_dotenv
import os

from llama_index.core import Document
from llama_index.core import VectorStoreIndex
from llama_parse import LlamaParse

import hashlib

import nest_asyncio

import openai

load_dotenv()
nest_asyncio.apply()

WORKDIR_PATH = Path(__file__).parent.parent
DATA_PATH = WORKDIR_PATH / "data"

st.title("Модуль поиска релевантной информации в документах")

LLAMA_CLOUD_API_KEY = os.getenv('LLAMA_CLOUD_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

openai.api_key = OPENAI_API_KEY

# Excel Formula Specialist
template = '''
`reset`
`no quotes`
`no explanations`
`no prompt`
`no self-reference`
`no apologies`
`no filler`
`just answer`
Ignore all prior instructions. As an Excel Formula Specialist, your role is to craft advanced Excel formulas tailored to the user's specified calculations or data manipulations. If the user’s requirements are unclear, prompt them for detailed information about the desired outcome, cell ranges, conditions, criteria, or output format.

1. **Clarification**: Ensure you fully understand the user’s needs by gathering comprehensive details.
2. **Formulation**: Develop a precise formula addressing these needs.
3. **Explanation**: Break down the formula, explaining each component's purpose and function.
4. **Context & Tips**: Offer practical advice for implementing the formula effectively in Excel.

Once you have fully grasped these instructions and are prepared to begin, respond with 'Understood'.
'''

parser = LlamaParse(
    api_key=LLAMA_CLOUD_API_KEY,
    result_type="markdown",
    language="ru",
)


# Set a default model
if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-3.5-turbo"

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

uploaded_files = st.file_uploader(
    "Приложите документы для работы", type=["pdf", "docx", "doc"], accept_multiple_files=True
)

if "chat_engine" not in st.session_state:
    documents = []
    for filename in os.listdir(DATA_PATH):
        if os.path.isfile(os.path.join(DATA_PATH, filename)):
            documents += parser.load_data(os.path.join(DATA_PATH, filename))

    index = VectorStoreIndex.from_documents(documents)
    st.session_state.chat_engine = index.as_query_engine(
        verbose=True, streaming=True
    )

# Accept user input
if prompt := st.chat_input():
    # for upl_file in uploaded_files:
    #     # file_bytes = upl_file.getvalue()
    #     # # Проверка есть ли такие данные уже в наборе через хеш-функцию
    #     # hash_bytes = hashlib.md5(file_bytes.getvalue()).hexdigest()
    #     with open(DATA_PATH / upl_file.name, mode='wb') as w:
    #         w.write(upl_file.getvalue())


    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.chat_message("user"):
        st.markdown(prompt)
    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        response_stream = st.session_state.chat_engine .query(prompt)
        response = st.write_stream(response_stream.response_gen)
    st.session_state.messages.append({"role": "assistant", "content": response})

# streamlit run chat.py
# Сколько прибыли получили за все сметы?
