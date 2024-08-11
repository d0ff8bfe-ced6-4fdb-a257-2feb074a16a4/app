import os
import torch
import streamlit as st
from pathlib import Path

from dotenv import load_dotenv
import os

from llama_index.core import VectorStoreIndex
from llama_parse import LlamaParse

import nest_asyncio

import openai

nest_asyncio.apply()

if torch.cuda.is_available():
    print("GPU is available")
else:
    print("GPU is not available")


LLAMA_CLOUD_API_KEY = os.getenv('LLAMA_CLOUD_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

openai.api_key = OPENAI_API_KEY

WORKDIR_PATH = Path(__file__).parent.parent
DATA_PATH = WORKDIR_PATH / "data"

print("---------Model initialization---------")

# ServiceContext.from_defaults(chunk_size=1024, llm=llm, embed_model="local")


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

print("model loaded")

parser = LlamaParse(
    api_key=LLAMA_CLOUD_API_KEY,
    result_type="markdown",
)


documents = []
for filename in os.listdir(DATA_PATH):
    if os.path.isfile(os.path.join(DATA_PATH, filename)):
        documents += parser.load_data(os.path.join(DATA_PATH, filename))
# documents = parser.load_data(DATA_PATH)
print(documents)


index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# TODO: Проблема здесь Error in G4FLLM._call: can only join an iterable
# Нужно зафиксить

response = query_engine.query("Сколько прибыли получили за все сметы?")
print(str(response))
