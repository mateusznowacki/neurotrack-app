# NeuroTrack Verification Guide

This guide will help you verify that the NeuroTrack application is working correctly.

## Prerequisites

- Docker and Docker Compose installed.
- Ports 8080 (Backend), 5173 (Frontend), and 5432 (Database) available.

## 1. Start the Application

Open a terminal in the project root and run:

```bash
docker-compose up --build
```

Wait for all services to start. You should see logs indicating that the Spring Boot application has started and the Vite server is ready.

## 2. Access the Application

Open your browser and navigate to: [http://localhost:5173](http://localhost:5173)

You should see the Landing Page.

## 3. User Registration

1. Click "Get Started" or "Sign Up".
2. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Create Account".
4. You should be redirected to the Login page.

## 4. User Login

1. Enter the credentials you just created:
   - Email: test@example.com
   - Password: password123
2. Click "Sign In".
3. You should be redirected to the Dashboard.

## 5. Dashboard Overview

- Verify that the "Total Attacks" is 0.
- Verify that the Weather Widget is displaying data (mock or real).
- Verify that "Recent Activity" shows "No entries found".

## 6. Log a Migraine Attack

1. Click "Log Attack".
2. **Step 1:**
   - Set Intensity to 7.
   - Set Start Time (default is current time).
   - Click "Next Step".
3. **Step 2:**
   - Select some symptoms (e.g., "Nausea", "Light Sensitivity").
   - Select some triggers (e.g., "Stress").
   - Click "Next Step".
4. **Step 3:**
   - Add a note: "Testing entry creation."
   - Click "Save Entry".
5. You should be redirected back to the Dashboard.

## 7. Verify Data Persistence

- On the Dashboard, verify that "Total Attacks" is now 1.
- Verify that the new entry appears in "Recent Activity".
- Refresh the page. The data should persist.

## 8. Backend API Verification (Optional)

You can verify the backend directly using `curl` or Postman.

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
Copy the `token` from the response.

**Get Entries:**
```bash
curl http://localhost:8080/api/entries \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

## Troubleshooting

- **CORS Errors:** Check the browser console. Ensure the backend allows `http://localhost:5173`.
- **Database Connection:** Check Docker logs for `neurotrack-db` and `neurotrack-backend`.
- **Build Failures:** Ensure Docker Desktop is running and you have internet access for downloading dependencies.
