#!/bin/bash
echo "Installing Link Tracker Production Environment..."
echo "-----------------------------------------------"

# Create project directory
mkdir -p link-tracker
cd link-tracker || exit

# Download essential files
echo "Downloading project files..."
curl -O https://raw.githubusercontent.com/[user]/[repo]/main/server.js
curl -O https://raw.githubusercontent.com/[user]/[repo]/main/package.json
curl -O https://raw.githubusercontent.com/[user]/[repo]/main/Dockerfile
curl -O https://raw.githubusercontent.com/[user]/[repo]/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/[user]/[repo]/main/DEPLOYMENT_GUIDE.md

# Install Node.js if needed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install dependencies
echo "Installing Node dependencies..."
npm install

# Set up Docker
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose
    sudo systemctl enable docker
    sudo systemctl start docker
fi

# Start services
echo "Starting services with Docker..."
docker-compose up -d --build

echo "-----------------------------------------------"
echo "Installation complete!"
echo "Access your Link Tracker at: http://localhost:3000"
echo "View logs with: docker-compose logs -f"
