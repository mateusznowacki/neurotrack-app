#!/bin/bash

# Stop execution on error
set -e

echo "Starting deployment..."

# Pull latest changes (uncomment if using git on server)
# git pull origin main

# Check if proxy network exists, create if not
if [ -z "$(docker network ls --filter name=^proxy$ --format="{{ .Name }}")" ]; then
  echo "Creating proxy network..."
  docker network create proxy
else
  echo "Proxy network already exists."
fi

# Build and start containers
echo "Building and starting containers..."
docker-compose up -d --build

# Prune unused images to save space
echo "Pruning unused images..."
docker image prune -f

echo "Deployment completed successfully!"
