# Link Tracker Production Deployment Guide

## Requirements
- Node.js (v16+ recommended)
- npm or yarn
- For real geolocation: 
  - IP geolocation API key (e.g., IPGeolocation.io, IPAPI)
  - MongoDB Atlas account (for production database)

## Installation
1. Download the project files:
   
   **Option 1: Download ZIP**
   - Click "Download ZIP" from GitHub/GitLab
   - Unzip the file
   - Open terminal in the unzipped folder

   **Option 2: Git Clone**
   ```bash
   git clone [your-repository-url]
   cd link-tracker
   ```

   **Option 3: Direct Download (no git)**
   ```bash
   mkdir link-tracker && cd link-tracker
   curl -O https://raw.githubusercontent.com/[user]/[repo]/main/server.js
   curl -O https://raw.githubusercontent.com/[user]/[repo]/main/package.json
   curl -O https://raw.githubusercontent.com/[user]/[repo]/main/Dockerfile
   # Repeat for other necessary files
   ```

2. Install dependencies:
```bash
npm install
```

## Configuration
1. Create `.env` file:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/linkTracker
GEOLOCATION_API_KEY=your_api_key_here
PORT=3000
```

2. Update server.js:
- Uncomment MongoDB connection code
- Replace mock locations with real geolocation API calls

## Running in Production
1. Start the server:
```bash
npm start
```

2. For better production use:
```bash
npm install pm2 -g
pm2 start server.js --name "link-tracker"
```

## Deployment Options
1. **Cloud Platforms**:
   - Vercel
   - Heroku
   - AWS Elastic Beanstalk
   - DigitalOcean App Platform

2. **Docker** (create Dockerfile):
```dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
