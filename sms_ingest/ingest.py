from sms_ingest.parser import is_financial_sms
from sms_ingest.extractor import extract_transaction_details
from database.db import SessionLocal
from database.models import Transaction
from models.transaction_classifier import clf

def process_sms(text):
    if not is_financial_sms(text):
        return None
    
    details = extract_transaction_details(text)
    category = clf.predict([details["description"]])[0]

    db = SessionLocal()
    tx = Transaction(
        description=details["description"],
        amount=details["amount"],
        category=category
    )
    db.add(tx)
    db.commit()
    db.close()

    return tx
