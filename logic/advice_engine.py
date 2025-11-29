import joblib
import numpy as np

def generate_advice(balance, avg_daily_spend, income_next_week):
    advice = []

    burn_rate = avg_daily_spend * 7
    if balance < burn_rate:
        advice.append("⚠️ You may run out of money within a week. Reduce non-essential spending.")

    if income_next_week < avg_daily_spend * 5:
        advice.append("⚠️ Next week's income looks low. Save a buffer now.")

    if avg_daily_spend > 800:
        advice.append("📉 High daily spending detected. Consider setting a spending cap.")

    if len(advice) == 0:
        advice.append("✅ You are financially stable. Keep going!")

    return advice
