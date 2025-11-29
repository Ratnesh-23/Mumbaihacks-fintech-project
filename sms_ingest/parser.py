import re

FINANCIAL_KEYWORDS = [
    "debited", "credited", "purchase", "upi", "withdrawn",
    "debit", "credit", "spent", "payment", "transaction", "rs", "inr"
]

def is_financial_sms(text: str) -> bool:
    text = text.lower()
    return any(keyword in text for keyword in FINANCIAL_KEYWORDS)
