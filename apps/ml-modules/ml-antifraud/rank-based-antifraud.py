import random
import streamlit as st
import time
# ranked-based antifraud expert system
# for small/medium buisness

total_score = 12


if "show" not in st.session_state:
    st.session_state.show = set()
    st.session_state.buttons = True
    st.session_state.company_raiting = None
    st.session_state.dublicates_casess = None
    st.session_state.statistical_anomaly_checking = None
    st.session_state.company_raiting = None
    st.session_state.progress_summary = None
st.title('Модель антифрода на правилах')

company_name = st.text_input("Название компании", "Research.Space")

if st.button("Вычислить"):
    with st.status('Ожидается ответ...', expanded=True):
        time.sleep(1)
        # factor 1:
        # company/client rating 0-3
        st.session_state.company_raiting = random.randint(0, 3)
        st.write(f"Оценка рейтинга компании: {st.session_state.company_raiting} / 3")

        time.sleep(1)
        # factor 2:
        # dublicating checking 0-3
        st.session_state.dublicates_casess = random.randint(0, 3)
        st.write(f"Оценка дубликации смет: {st.session_state.dublicates_casess} / 3")

        time.sleep(1)
        # factor 3:
        # cost estimate overhead checking 0-3
        st.session_state.cost_estimate_overhead_checking = random.randint(0, 3)
        st.write(f"Оценка превышения затрат на сметы: {st.session_state.cost_estimate_overhead_checking} / 3")

        time.sleep(2)
        # factor 4:
        # statistical anomaly analysis 0-3
        st.session_state.statistical_anomaly_checking = random.randint(0, 3)
        st.write(f"Оценка статистической аномалии: {st.session_state.statistical_anomaly_checking} / 3")

    st.write("Оценка антифрода")
    summary = st.session_state.company_raiting + st.session_state.dublicates_casess + st.session_state.cost_estimate_overhead_checking + st.session_state.statistical_anomaly_checking

    if summary > 9:
        st.session_state.progress_summary_text = ":white_check_mark: :green[Нет мошенничества]"
    elif summary > 6:
        st.session_state.progress_summary_text = ":sparkles: :rainbow[Небольшие аномалии в поведении]"
    elif summary > 3:
        st.session_state.progress_summary_text = ":question: :orange[Возможно мошенничество]"
    else:
        st.session_state.progress_summary_text = ":heavy_exclamation_mark: :red[Высокий шанс мошенничества]"

    st.write(st.session_state.progress_summary_text)
    st.progress(summary / total_score)

# streamlit run rank-based-antifraud.py
