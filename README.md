# EduInsight

EduInsight is a MERN-style application for student performance analytics.

## Local development

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Deployment plan

- Frontend: deploy on Vercel
- Backend: deploy on Render
- Database: use MongoDB Atlas

### Required environment variables

Backend:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CORS_ORIGIN`

Frontend:
- `VITE_API_URL`

## Seed demo data

```bash
cd backend
npm run seed
```

## Demo credentials

- Teacher: `alice.teacher@example.com` / `Password123!`
- Student: `bob.student@example.com` / `Password123!`
