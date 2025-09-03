# Waste To Resource - React App

## Overview
This is a React application built with Create React App, imported from GitHub and configured for the Replit environment. The app is currently displaying the default React starter template.

## Project Architecture
- **Frontend**: React 19.1.1 with Create React App
- **Build System**: React Scripts 5.0.1
- **Testing**: Jest and React Testing Library
- **Port Configuration**: Development server runs on port 5000
- **Deployment**: Configured for autoscale deployment using static file serving

## Current State
- ✅ Dependencies installed successfully
- ✅ Development server configured for Replit environment
- ✅ Workflow configured to run on port 5000 with proper host settings
- ✅ Deployment configuration set up for production
- ✅ Application running successfully and accessible

## Recent Changes (September 03, 2025)
- Imported from GitHub repository
- Installed npm dependencies
- Configured development server with environment variables:
  - PORT=5000
  - HOST=0.0.0.0
  - DANGEROUSLY_DISABLE_HOST_CHECK=true
  - WDS_SOCKET_HOST=0.0.0.0
- Set up React App workflow for development
- Configured autoscale deployment with build and serve commands

## Development Commands
- `npm start` - Start development server (configured in workflow)
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (one-way operation)

## Project Structure
```
wastetoresource/
├── public/          # Static assets
├── src/             # React source code
│   ├── App.js       # Main App component
│   ├── index.js     # Application entry point
│   └── ...          # Other React components and assets
├── package.json     # Dependencies and scripts
└── README.md        # Original Create React App documentation
```

## User Preferences
- Using Create React App framework (preserving existing structure)
- Standard React development workflow
- Autoscale deployment for simple static hosting