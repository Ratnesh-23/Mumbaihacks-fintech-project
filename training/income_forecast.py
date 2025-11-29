import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import joblib

# -------------------------
# 1. Create synthetic income data
# -------------------------
np.random.seed(42)
days = 120
income = np.abs(np.sin(np.arange(days) / 5) * 500 + np.random.normal(0, 80, days)) + 300

df = pd.DataFrame({"income": income})

# -------------------------
# 2. Scale data
# -------------------------
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(df)

seq_len = 10
X, y = [], []

for i in range(len(scaled_data) - seq_len):
    X.append(scaled_data[i:i+seq_len])
    y.append(scaled_data[i+seq_len])

X, y = np.array(X), np.array(y)

# -------------------------
# 3. Build LSTM
# -------------------------
model = Sequential([
    LSTM(50, return_sequences=False, input_shape=(seq_len, 1)),
    Dense(1)
])

model.compile(optimizer="adam", loss="mse")
model.fit(X, y, epochs=15, batch_size=8, verbose=1)

# -------------------------
# 4. Save model + scaler
# -------------------------
model.save("income_lstm.keras")
joblib.dump(scaler, "income_scaler.pkl")

print("Income forecast model saved.")
