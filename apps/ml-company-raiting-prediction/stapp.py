import pandas as pd
import streamlit as st
import numpy as np
import time
import random

import xgboost as xgb

model_path = 'rating-prediction.json'
model = xgb.XGBClassifier()

model.load_model(model_path)

median_data = pd.read_csv('median_data.csv').iloc[0][7:]

rating_mapper = {
    0: 'Низкий рейтинг',
    1: 'Средний рейтинг',
    2: 'Высокий рейтинг',
    3: 'Очень высокий рейтинг'
}

def model_evalutate(*features):
    input_data = np.array([[*features, *median_data]], dtype=np.float32)
    outputs = model.predict(input_data)
    return outputs[0], rating_mapper[outputs[0]]

# streamlit logic

def simulate_long_running_process():
    time.sleep(2)
    return "Long-running process complete"


# if "currentRatio" not in st.session_state:
#     st.session_state.currentRatio = 0
# if "quickRatio" not in st.session_state:
#     st.session_state.quickRatio = 0
# st.session_state.cashRatio = 0
# st.session_state.daysOfSalesOutstanding = 0
# st.session_state.netProfitMargin = 0

if "show" not in st.session_state:
    st.session_state.show = set()
    st.session_state.buttons = True
    st.session_state.currentRatio = 0
    st.session_state.quickRatio = 0
    st.session_state.cashRatio = 0
    st.session_state.daysOfSalesOutstanding = 0
    st.session_state.netProfitMargin = 0

st.title('Модель предсказания рейтинга компании')

company_name = st.text_input("Название компании", "Research.Space")

if st.button(f"Собрать данные"):
    simulate_long_running_process()
    st.write("Собираем данные...")
    st.session_state.currentRatio = round(float(random.uniform(0, 2)), 2)
    st.session_state.quickRatio = round(float(random.uniform(0, 2)), 2)
    st.session_state.cashRatio = round(float(random.uniform(0, 2)), 2)
    st.session_state.daysOfSalesOutstanding = round(float(random.uniform(20, 40)), 2)
    st.session_state.netProfitMargin = round(float(random.uniform(0.02, 0.11)), 2)
    st.session_state.show.add(st.session_state.buttons)
    # st.session_state.test = round(float(random.uniform(0, 2)), 2)
    # test_field = round(float(random.uniform(0, 2)), 2)


if st.session_state.buttons in st.session_state.show:
    # test_field = st.number_input("test_field", key="test")
    st.number_input("Коэффициент ликвидности", value=st.session_state.currentRatio)
    st.number_input("Коэффициент срочной ликвидности", value=st.session_state.quickRatio)
    st.number_input("Коэффициент наличности", st.session_state.cashRatio)
    st.number_input("Срок оборота дебиторской задолженности", st.session_state.daysOfSalesOutstanding)
    st.number_input("Рентабельность продаж", st.session_state.netProfitMargin)

if st.session_state.buttons in st.session_state.show:
    if st.button(f"Вычислить"):
        rating, rating_text = model_evalutate(
            st.session_state.currentRatio,
            st.session_state.quickRatio,
            st.session_state.cashRatio,
            st.session_state.daysOfSalesOutstanding,
            st.session_state.netProfitMargin
            )
        st.write(rating)
        st.write(rating_text)

# streamlit run stapp.py
