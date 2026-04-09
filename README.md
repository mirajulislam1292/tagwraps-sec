# TagWraps Sec — Simply Authentic.

Full-stack management + authentication platform for TagWraps (smart NFC-based product authentication).

## Tech stack

- **Frontend**: React (Vite), Tailwind CSS, shadcn-style UI components, React Router v6, Axios, Recharts, React Hook Form + Zod
- **Backend**: Node.js, Express (REST), JWT access+refresh tokens (httpOnly cookies), bcrypt
- **DB**: PostgreSQL (Supabase), Prisma ORM
- **Crypto**: Node `crypto` (ECDSA P-256 + SHA-256)
- **Storage**: Cloudinary (product images)
- **Email**: Nodemailer (Gmail SMTP)

## Folder structure

`tagwraps-sec/`
- `frontend/` — React app
- `backend/` — Express API + Prisma

## Environment variables

Backend (`backend/.env`):

- `DATABASE_URL` PostgreSQL connection string (Supabase)
- `JWT_SECRET` access token secret
- `JWT_REFRESH_SECRET` refresh token secret
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `GMAIL_USER`
- `GMAIL_PASS`
- `ECDSA_PRIVATE_KEY` (auto-generated on first startup if missing)
- `ECDSA_PUBLIC_KEY` (auto-generated on first startup if missing)
- `CLIENT_URL` e.g. `http://localhost:5173`
- `PORT` e.g. `4000`

Frontend (`frontend/.env`):

- `VITE_API_URL` e.g. `http://localhost:4000`

## Local development

### Backend

```bash
cd backend
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
node src/prisma/seed.js
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm run dev
```

Open the app at `http://localhost:5173`.

Seeded demo users:
- **Super Admin**: `admin@tagwraps.com` / `Admin@123456`
- **Demo Manufacturer**: `demo@squarepharma.com.bd` / `Demo@123456`

## Public Verification API

- `POST /api/v1/verify`
- `GET /api/v1/verify/:tag_uid`

## Deployment

- **Frontend**: Vercel (set `VITE_API_URL` to backend URL)
- **Backend**: Railway or Render (set all backend env vars)
- **Database**: Supabase PostgreSQL (free tier)

## Writing to physical NFC chips

Write the public URL to the chip:

`https://<your-frontend-domain>/verify/<tag_uid>`

Then lock the tag record in TagWraps Sec once chips are programmed.

