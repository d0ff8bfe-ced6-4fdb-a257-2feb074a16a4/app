import pandas as pd
import streamlit as st
import numpy as np

import onnx
import onnxruntime as ort

model_path = 'rating-prediction.onnx'
onnx_model = onnx.load(model_path)
ort_session = ort.InferenceSession(model_path)
# TODO: Add ONNX support
# currently doesn't work

input_name = ort_session.get_inputs()[0].name
output_name = ort_session.get_outputs()[0].name

median_data = pd.read_csv('median_data.csv').iloc[0]


def model_evalutate(currentRatio, quickRatio, cashRatio):
    input_data = np.array([currentRatio, quickRatio, cashRatio, *median_data[3:]], dtype=np.float32)
    outputs = ort_session.run([output_name], {input_name: input_data})

    return outputs

def main():
    st.title('Модель предсказания рейтинга компании')
    currentRatio = st.number_input("Коэффициент ликвидности")
    quickRatio = st.number_input("Коэффициент срочной ликвидности")
    cashRatio = st.number_input("Коэффициент наличности")

    if st.button('Вычислить'):
        st.write('Рейтинг:', model_evalutate(currentRatio, quickRatio, cashRatio))

if __name__ == '__main__':
    main()

# streamlit run stapp.py
