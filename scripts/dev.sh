#!/bin/bash

echo "Starting backend..."
cd apps/backend
uvicorn app.main:app --reload &
BACKEND_PID=$!

echo "Starting frontend..."
cd ../../apps/frontend
npm run dev

kill $BACKEND_PID
