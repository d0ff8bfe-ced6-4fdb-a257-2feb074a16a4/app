from re import S
import numpy as np
from scipy.optimize import linprog

skill_map = {
    0: "Программирование",
    1: "Дизайн",
    2: "Маркетинг",
    3: "Работа с данными",
    4: "Коммуникация"
}

personal_data = {
    1: {
        "name": "Алиса",
        "age": 25,
        "experience": 5
    },
    2: {
        "name": "Борис",
        "age": 30,
        "experience": 7
    },
    3: {
        "name": "Валерия",
        "age": 28,
        "experience": 3
    },
    4: {
        "name": "Дмитрий",
        "age": 35,
        "experience": 10
    },
    5: {
        "name": "Елена",
        "age": 22,
        "experience": 1
    }
}

tasks = {
    1: {
        "name": "Разработка веб-сайта"
    },
    2: {
        "name": "Анализ данных"
    },
    3: {
        "name": "Создание рекламной кампании"
    },
    4: {
        "name": "Разработка мобильного приложения"
    },
    5: {
        "name": "Создание презентации"
    }
}

psn2skill = np.array([
    [8, 4, 6, 9, 7],  # Участник 1
    [9, 8, 5, 6, 8],  # Участник 2
    [6, 9, 8, 5, 9],  # Участник 3
    [7, 6, 9, 8, 6],  # Участник 4
    [5, 7, 6, 7, 5]   # Участник 5
])
task2req_skills = np.array([
    [8, 6, 4, 0, 0],  # дело 1
    [5, 0, 0, 9, 4],  # дело 2
    [4, 8, 9, 0, 0],  # дело 3
    [9, 7, 0, 4, 0],  # дело 4
    [0, 8, 4, 0, 6]   # дело 5
])

s = psn2skill
t = task2req_skills

# по столбцам дела
# по i строке на каждое дело значения опр. навыка i
t = t.transpose()
# по i строке на участника i его эффективность по делу j
profit_matrix = np.dot(s, t)
print(profit_matrix)

# def hungarian_algorithm(cost_matrix):
#     n = len(cost_matrix)
#     row_ind = np.zeros(n, dtype=int)
#     col_ind = np.zeros(n, dtype=int)
#     covered_rows = np.zeros(n, dtype=bool)
#     covered_cols = np.zeros(n, dtype=bool)

#     while True:
#         # Find the minimum cost for each row
#         min_costs = np.min(cost_matrix, axis=1)
#         # Find the maximum cost for each column
#         max_costs = np.max(cost_matrix, axis=0)
#         # Subtract the minimum cost from all rows
#         cost_matrix -= min_costs[:, np.newaxis]
#         # Add the maximum cost to all columns
#         cost_matrix += max_costs[np.newaxis, :]
#         # Find the zeros in the cost matrix
#         zeros = np.argwhere(cost_matrix == 0)
#         # Find the augmenting path
#         augmenting_path = find_augmenting_path(zeros, covered_rows, covered_cols)
#         if augmenting_path is None:
#             break
#         # Update the assignment
#         row_ind, col_ind = update_assignment(row_ind, col_ind, augmenting_path)

#     return row_ind, col_ind

# def find_augmenting_path(zeros, covered_rows, covered_cols):
#     for zero in zeros:
#         row, col = zero
#         if not covered_rows[row] and not covered_cols[col]:
#             return [zero]
#     return None

# def update_assignment(row_ind, col_ind, augmenting_path):
#     for i, zero in enumerate(augmenting_path):
#         row, col = zero
#         if i % 2 == 0:
#             row_ind[row] = col
#         else:
#             col_ind[col] = row
#     return row_ind, col_ind


# # print(hungarian_algorithm(cost_matrix))
