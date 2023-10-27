#!/bin/bash
set -euxo pipefail

# gunicorn breed_detection.asgi:app -b 0.0.0.0:8000 -k uvicorn.workers.UvicornWorker
python run.py