# AI-Assisted Journal System – Architecture

## System Overview

The system allows users to:
- Create journal entries after immersive sessions
- Analyze emotions using an LLM
- View insights about mental state over time

---

## Backend Architecture

- Node.js + Express
- RESTful API design
- MongoDB for data storage
- LLM service for emotion analysis

Flow:
Frontend → API → Controller → LLM Service → Database → Response

---

## Database Design

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

This structure supports analytics and time-based insights.

---

## Scaling to 100k Users

To scale:

1. Use load balancer (Nginx / Cloud LB)
2. Deploy multiple backend instances
3. Use MongoDB Atlas cluster
4. Add database indexing on:
   - userId
   - createdAt
5. Use horizontal scaling
6. Use caching layer (Redis)

---

## Reducing LLM Cost

1. Cache repeated analysis results
2. Avoid re-analyzing same text
3. Use lightweight models
4. Limit token size
5. Batch processing if possible

---

## Caching Strategy

- Store analysis result in DB
- Before calling LLM:
  - Check if same text exists
  - If yes → return cached result
- Use Redis for fast caching (production)

---

## Protecting Sensitive Data

1. Use authentication (JWT)
2. Encrypt data at rest
3. Use HTTPS
4. Validate userId
5. Add rate limiting
6. Avoid exposing internal errors

---

## Future Improvements

- Streaming LLM responses
- Mood trend visualization
- Docker deployment
- CI/CD pipeline
