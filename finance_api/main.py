from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from logic.advice_engine import generate_advice

app = FastAPI()

# Load Models
clf = joblib.load("models/transaction_classifier.pkl")
income_model = load_model("models/income_lstm.keras", compile=False)
scaler = joblib.load("models/income_scaler.pkl")

class TransactionText(BaseModel):
    text: str

class ForecastRequest(BaseModel):
    seq: list

@app.post("/classify")
def classify_transaction(input: TransactionText):
    return {"category": clf.predict([input.text])[0]}

@app.post("/forecast")
def forecast_income(req: ForecastRequest):
    x = np.array(req.seq).reshape(-1,1)
    x_scaled = scaler.transform(x)
    x_scaled = np.expand_dims(x_scaled, 0)
    y = income_model.predict(x_scaled)
    y = scaler.inverse_transform(y)[0][0]
    return {"predicted_income": float(y)}

@app.get("/")
def home():
    return {"message": "Finance AI API is live!"}
