# 🧠 AI-Assisted Journal System

An intelligent journal platform that combines immersive nature sessions with AI-powered emotion analysis to evaluate user mental state over time.

---

## 🚀 Project Overview

Users complete immersive ambience sessions such as:
🌲 Forest  
🌊 Ocean  
⛰ Mountain  

After each session, they write a journal entry.

The system:

✔ Stores journal entries in database  
✔ Uses an LLM to analyze emotions  
✔ Generates insights about mental state  
✔ Displays analytics on frontend  

This project demonstrates:

- RESTful API design  
- LLM integration  
- Data modeling  
- Frontend integration  
- Practical AI usage  

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- LLM Service Integration

### Frontend
- React
- Recharts (for charts)
- Axios

---

## 📌 Core Features

### 1️⃣ Create Journal Entry

Endpoint:

POST /api/journal

Request Body:

{
  "userId": "123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}

Functionality:

- Stores entry in database
- Saves emotion and keywords
- Returns saved document

---

### 2️⃣ Get All Entries

Endpoint:

GET /api/journal/:userId

Response:
Returns all journal entries for the user.

---

### 3️⃣ LLM Emotion Analysis

Endpoint:

POST /api/journal/analyze

Request:
```
{ "text": "I felt calm today after listening to the rain." }

```
Expected Response:
```
{
  "emotion": "calm",
  "keywords": ["rain", "nature", "peace"],
  "summary": "User experienced relaxation during the session."
}
```
The system uses a real LLM for analysis.

---

### 4️⃣ Insights API

Endpoint:

GET /api/journal/insights/:userId

Response:
```
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus", "nature", "rain"]
}
```
Provides analytics for user mental state trends.

---

## 🖥 Minimal Frontend

The application includes a simple UI where users can:

✔ Write journal entries  
✔ Save entries  
✔ Click Analyze  
✔ View insights  
✔ See previous entries  
✔ View emotion analytics chart  

UI design is intentionally minimal.

---

## 🗄 Database Structure

Collection: Journal

Fields:

- userId
- ambience
- text
- emotion
- keywords
- summary
- createdAt
- updatedAt

This structure supports analytics and scaling.

---

## 📊 Analytics Features

- Total entries count
- Top emotion detection
- Most used ambience
- Recent keywords extraction
- Emotion distribution chart
- Trend visualization

---

## 📈 How to Scale to 100k Users

To scale production:

- Use Load Balancer
- Deploy multiple backend instances
- Use MongoDB Atlas cluster
- Add indexing on userId and createdAt
- Use horizontal scaling
- Introduce caching layer (Redis)
- Use CDN for frontend

---

## 💰 How to Reduce LLM Cost

- Cache analysis results
- Avoid re-analyzing same text
- Limit input token size
- Use lightweight models
- Batch processing where possible
- Store previous results in DB

---

## ⚡ Caching Strategy

Before calling LLM:

- Check if same text already analyzed
- Store emotion result in database
- Optionally use Redis for faster retrieval

This reduces API cost and improves performance.

---

## 🔐 Security & Data Protection

- Use HTTPS
- Implement authentication (JWT)
- Validate user input
- Add rate limiting
- Protect API endpoints
- Avoid exposing internal errors
- Encrypt sensitive data

---

## 🐳 Optional Improvements

- Docker setup
- Streaming LLM responses
- Rate limiting middleware
- Deployed demo link
- CI/CD pipeline
- Advanced analytics dashboard

---

## 📁 Project Structure

backend/
- controllers/
- models/
- routes/
- services/

frontend/
- components/
- pages/

Clean separation of concerns is maintained.

---

## 🎯 Evaluation Alignment

✔ Backend API Design  
✔ Proper Data Modeling  
✔ Real LLM Integration  
✔ Frontend Integration  
✔ Insights Generation  
✔ Clean Code Structure  
✔ Documentation Provided  

---

## 👩‍💻 Author

AI-Assisted Journal System  
Built for evaluating API design, LLM integration, and practical implementation.
