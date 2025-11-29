import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

# -------------------------
# 1. Load or create synthetic data
# -------------------------
data = {
    "description": [
        "uber ride", "grocery store", "salary credited", "monthly rent",
        "netflix subscription", "electricity bill", "restaurant dinner",
        "doctor visit", "gym membership"
    ],
    "category": [
        "transport", "food", "income", "housing", 
        "entertainment", "utilities", "food",
        "medical", "fitness"
    ]
}

df = pd.DataFrame(data)

# -------------------------
# 2. Train model
# -------------------------
X = df["description"]
y = df["category"]

model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression())
])

model.fit(X, y)

# -------------------------
# 3. Save model
# -------------------------
joblib.dump(model, "transaction_classifier.pkl")

print("Model trained & saved as transaction_classifier.pkl")
