import re

def extract_transaction_details(text: str):
    # extract amount
    amount_match = re.search(r'rs\.?\s?(\d+\.?\d*)', text.lower())
    amount = float(amount_match.group(1)) if amount_match else None

    # extract UPI description / merchant
    desc_match = re.search(r'upi:? (.*?)(?= rs|$)', text.lower())
    description = desc_match.group(1).strip() if desc_match else text[:50]

    return {
        "amount": amount,
        "description": description
    }
