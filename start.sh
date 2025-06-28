#!/bin/bash

set -e

if command -v docker compose &> /dev/null; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
  COMPOSE_CMD="docker-compose"
else
  echo "docker compose or docker-compose not installed"
  exit 1
fi

echo "Using: $COMPOSE_CMD"

### env setup
if [ -z "$1" ]; then
  echo "Usage: sh start.sh <API_HOST_URL>"
  echo "Error: API_HOST_URL is required"
  exit 1
fi

API_HOST_URL=${1}

echo "Using host: $API_HOST_URL"

### execute
$COMPOSE_CMD build --build-arg API_HOST_URL="$API_HOST_URL"
$COMPOSE_CMD up -d
