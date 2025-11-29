from fastapi import FastAPI
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from logic.advice_engine import generate_advice
from database.db import SessionLocal, create_tables
from database.models import User, Transaction

app = FastAPI()

# Load models ONCE
clf = joblib.load("models/transaction_classifier.pkl")
income_model = load_model("models/income_lstm.h5", compile=False)
income_model.compile(optimizer="adam", loss="mse")
scaler = joblib.load("models/income_scaler.pkl")

@app.get("/")
def root():
    return {"message": "Financial Agent API running!"}

@app.post("/classify")
def classify(text: str):
    pred = clf.predict([text])[0]
    return {"category": pred}

@app.post("/forecast")
def forecast(values: list[float]):
    arr = np.array(values).reshape(-1, 1)
    arr_scaled = scaler.transform(arr)
    arr_scaled = np.expand_dims(arr_scaled, axis=0)
    pred = income_model.predict(arr_scaled)
    income = scaler.inverse_transform(pred)[0][0]
    return {"next_income": float(income)}

@app.post("/advice")
def advice(balance: float, avg_daily_spend: float, future_income: float):
    result = generate_advice(balance, avg_daily_spend, future_income)
    return {"advice": result}

@app.post("/user/create")
def create_user(username: str, email: str):
    db = SessionLocal()
    new_user = User(username=username, email=email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created", "user": {"id": new_user.id}}

@app.get("/user/{user_id}")
def get_user(user_id: int):
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    return user

from fastapi import FastAPI
from sms_ingest.ingest import process_sms

app = FastAPI()

@app.post("/ingest/sms")
def ingest_sms(message: str):
    tx = process_sms(message)
    return {"status": "stored", "transaction": str(tx)}
