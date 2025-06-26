# Trielectric Telemetry Dashboard

It simulate device data and display it on a dashboard.

- Backend - Node.js Express TypeScript
- Frontend - Next.js React TypeScript Tailwind CSS
- Database - MongoDB

## Setup

1. Clone the repository
2. Install dependencies
```ts
    cd frontend
    npm install
    cd ..
    cd Backend
    cd ..
```
3. Start the MongoDB container
```ts
docker-compose up 
```
4. Start the backend
```ts
cd Backend
npm run dev
```
5. Start the frontend
```ts
cd frontend
npm run dev
```

The project will be available at `http://localhost:3000`

## Approach Followed
- Polling From frontend every 10 seconds
- Initial Device Support - 10k Concurrent Requests,
- To Increase Concurrent Requests - 
  - Use Node.js Cluster
  - Increase the number of EC2 Instances
