"""
Usage:
- Run app: python run.py
- Generate openapi docs: python run.py openapi
"""
import os
import uvicorn

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))

if __name__ == "__main__":
    uvicorn.run("asgi:app", port=8000, host="0.0.0.0", reload=True)
