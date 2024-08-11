from hungarian import Hungarian

import os
from pathlib import Path
import pandas as pd

import numpy as np
import streamlit as st

import json

WORKDIR_PATH = Path(__file__).parent

skill_map = {
    0: "Программирование",
    1: "Дизайн",
    2: "Маркетинг",
    3: "Работа с данными",
    4: "Коммуникация"
}

if "show" not in st.session_state:
    st.session_state.show = set()
    st.session_state.buttons = True
    st.session_state.iter_tasks = 0

def is_square(arr):
    return arr.shape[0] == arr.shape[1]


def make_square(matrix):
    return np.pad(matrix, ((0, 1), (0, 0)), mode='constant')


def eval_hungarian(profit_matrix):
    hung = Hungarian(profit_matrix, is_profit_matrix=True)
    hung.calculate()

    return hung.get_results() # list of tuples (a, b)

# streamlit logic

st.title('Модуль вычисления оптимальной работы')

# if st.button('Заполнить шаблон'):


# if st.button('Добавить задачу'):
#     st.session_state.iter_tasks += 1
#     if f"task_{st.session_state.iter_tasks}" not in st.session_state:
#         st.session_state[f"task_{st.session_state.iter_tasks}"] = True

# if st.button('Убрать задачу') and st.session_state.iter_tasks > 0:
#     st.session_state.iter_tasks -= 1

# for iter_task in range(1, st.session_state.iter_tasks + 1):
#     st.text_input(f"Название задачи {iter_task}", value=st.session_state[f"task_name_{iter_task}"])

# for iter_task in range(1, st.session_state.iter_tasks + 1):
#     st.write(f"Умения: {' '.join(list(skill_map.values()))}")
#     st.text_input(f"Сложность задачи по умениям", value=st.session_state[f"task2req_{iter_task}"])


# psn2skill = st.json()
with open(WORKDIR_PATH / "psn_info.json", 'r') as f:
    psn2skills_template = json.load(f)
with open(WORKDIR_PATH / "task_info.json", 'r') as f:
    task2req_skills_template = json.load(f)

st.write("Информация о сотрудниках")

psn2skills_d = st.data_editor(psn2skills_template)
psn2skills = np.array(pd.DataFrame(psn2skills_d).iloc[:, 3:])


st.write("Информация о задачах")

task2req_skills_d = st.data_editor(task2req_skills_template)
task2req_skills = np.array(pd.DataFrame(task2req_skills_d).iloc[:, 2:])
req_skills2task = np.array(task2req_skills).transpose()

profit_matrix = np.dot(psn2skills, req_skills2task)
print(profit_matrix)

st.write("Матрица эффективности")
st.write(profit_matrix)

if st.button("Подсчитать эффективные пары"):
    st.write(eval_hungarian(profit_matrix))

# streamlit run web-app.py
