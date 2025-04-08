
Built by https://www.blackbox.ai

---

```markdown
# Link Tracker

## Project Overview
Link Tracker is a web application designed to generate and track shortened URLs along with their geolocation. Users can create short links and monitor their usage, including tracking visits and capturing the location of users who click the links.

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm (Node package manager)

### Steps
1. **Download the project files**:
   - **Option 1: Download ZIP**
     - Click "Download ZIP" from the project repository on GitHub.
     - Unzip the file and open terminal in the unzipped folder.
  
   - **Option 2: Git Clone**
     ```bash
     git clone [your-repository-url]
     cd link-tracker
     ```
  
   - **Option 3: Direct Download (no git)**
     ```bash
     mkdir link-tracker && cd link-tracker
     curl -O https://raw.githubusercontent.com/[user]/[repo]/main/server.js
     curl -O https://raw.githubusercontent.com/[user]/[repo]/main/package.json
     ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configuration**:
   - Create a `.env` file in the root directory with the following content:
     ```env
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/linkTracker
     GEOLOCATION_API_KEY=your_api_key_here
     PORT=3000
     ```
   - Update `server.js` to include your MongoDB connection logic and replace any mock geolocation code with actual API calls.

## Usage
To start the server, use the following command:
```bash
npm start
```
For development with automatic server restarts, use:
```bash
npm run dev
```

### API Endpoints
- **Create a new tracking link**:
  - **POST** `/api/links`
  - **Request Body**: `{ "originalUrl": "http://example.com" }`
  
- **Track a link visit**:
  - **GET** `/:shortCode`
  
- **Get link statistics**:
  - **GET** `/api/links/:shortCode`

## Features
- Generate short URLs using a simple interface.
- Track clicks on shortened links with geolocation data.
- Store link stats and visit logs.
- Built using Express.js, with CORS enabled for cross-origin requests.

## Dependencies
This project relies on the following libraries:
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **shortid**: For generating short, unique IDs.
- **cors**: Middleware for enabling CORS.

Check `package.json` for more details on versions.

## Project Structure
```
link-tracker/
├── server.js         # Main server file to handle API requests and link tracking
├── package.json      # Defines project metadata, scripts, and dependencies
├── package-lock.json # Locks the installed dependencies to specific versions
├── .env              # Environment variables for configuration (not included in the repo)
├── DEPLOYMENT_GUIDE.md # Guide for deploying the application to production
├── docker-compose.yml # Configuration for running the app with Docker
└── public            # Directory for serving static files (if needed)
```

## Contribution
Contributions are welcome! Please fork this repository and submit a pull request for review.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
```