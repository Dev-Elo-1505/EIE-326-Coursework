import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

np.random.seed(42)  # set random seed for reproducibility
# generate data: hours studied (1-20) vs exam score
hours_studied = np.arange(1, 21)  # 1-20 hours
exam_score = 40 + 5 * hours_studied + np.random.normal(0, 5, 20)
df = pd.DataFrame({'Hours_Studied': hours_studied, 'Exam_Score': exam_score})  # create dataframe
print(df.head())  # display first few rows
df.to_csv('data.csv', index=False)
print('Dataset saved to data.csv')


plt.figure(figsize=(10,6))
plt.scatter(df['Hours_Studied'], df['Exam_Score'], color='blue', alpha=0.6, s=100)
plt.xlabel('Hours Studied', fontsize=12)
plt.ylabel('Exam Score', fontsize=17)
plt.title('Exam Score vs Hours Studied', fontsize=14)
plt.grid(True, alpha=0.3)
plt.show()