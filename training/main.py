import joblib
import numpy as np
from tensorflow.keras.models import load_model
from advice_engine import generate_advice

# -------------------------
# Load models
# -------------------------
clf = joblib.load("transaction_classifier.pkl")

# Load LSTM safely (fixes keras.metrics.mse error)
income_model = load_model("income_lstm.h5", compile=False)
income_model.compile(optimizer="adam", loss="mse")

scaler = joblib.load("income_scaler.pkl")

# -------------------------
# Example: classify a transaction
# -------------------------
print(clf.predict(["pizza at dominos"]))

# -------------------------
# Example: forecast next income
# -------------------------
sample_seq = np.random.rand(10, 1)   # temp synthetic input
sample_seq_scaled = scaler.transform(sample_seq)
sample_seq_scaled = np.expand_dims(sample_seq_scaled, axis=0)

pred_income = income_model.predict(sample_seq_scaled)
pred_income = scaler.inverse_transform(pred_income)[0][0]

print("Predicted next income:", pred_income)

# -------------------------
# Generate advice
# -------------------------
advice = generate_advice(
    balance=3500,
    avg_daily_spend=700,
    income_next_week=pred_income
)

print("Advice:", advice)
