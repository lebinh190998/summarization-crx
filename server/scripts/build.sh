#!/bin/bash
set -euxo pipefail

poetry lock
poetry config virtualenvs.create false

poetry install --no-interaction --no-ansi --no-dev