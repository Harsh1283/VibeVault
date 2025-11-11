# VibeVault

A full‑stack AI‑assisted music library & mood based recommendation app. Users can register, login, upload songs (image + audio), search by name/artist/mood, and get AI mood‑based song recommendations generated from free‑text input. Built with a MERN style backend (Express + MongoDB + JWT + Cloudinary/ImageKit + Google Generative AI) and a modern React (Vite + Redux Toolkit + Tailwind + Sass) frontend. Deployed frontend on **Vercel** and backend on **Render**.

## Live Demo
Frontend (Vercel): https://vibe-vault-topaz.vercel.app/
Backend Base URL (Render): <your-render-backend-url>

> Set `VITE_API_URL` in the frontend to point to the Render backend base URL (e.g. `https://vibevault-backend.onrender.com`). Replace the placeholder above with your actual URL.

## Key Features
- User authentication (register, login, logout) with JWT cookies.
- Protected & public routes (React Router + guard components).
- Song upload with in‑memory multer buffer and direct Cloudinary upload (audio & optional image).
- Search songs by name, artist, or mood (case‑insensitive substring match).
- AI mood detection from arbitrary text via Google Gemini (Gemini 2.5 Flash) -> recommend mood‑matched songs.
- Get song detail by ID.
- Centralized async handling & structured API responses.
- State management via Redux Toolkit slices (auth, songs, now playing).
- Responsive UI (React + Tailwind + Sass modules) with Now Playing component.
- CORS configured for local dev + deployed domains.

## Tech Stack
### Backend
- Node.js, Express 5
- MongoDB (Mongoose)
- JWT (auth) + bcrypt (hashing)
- Multer (memory storage)
- Cloudinary (media hosting) & ImageKit (configured for potential usage)
- Google Generative AI (@google/generative-ai) for mood inference
- dotenv, cors, cookie-parser

### Frontend
- React 18 + Vite
- Redux Toolkit + React Redux
- React Router DOM v7
- Tailwind CSS + Sass
- Axios (API client)

## Project Structure
```
Backend/
  index.js                # Server bootstrap (loads env, connects DB, starts Express)
  src/
    app.js                # Express app configuration, middleware, routes
    config/config.js      # Environment variable config abstraction
    controller/           # Controllers (UserController, SongControllers)
    db/db.coonect.js      # MongoDB connection helper
    middleware/           # auth & multer middleware
    modles/               # Mongoose models (user, song)
    routes/               # auth.routes.js, song.routes.js
    services/             # mood.service (Gemini), storage.service (ImageKit)
    utils/                # ApiError, ApiResponse, asyncHandler, Cloudinary helper
Frontend/
  src/
    features/             # Redux slices (auth, song, nowPlaying)
    components/           # UI components (Navbar, NowPlaying, SongList, etc.)
    pages/                # Page components (Login, Register, Home, Upload, etc.)
    routes/AppRoutes.jsx  # Route protection logic
    app/Store.js          # Redux store setup
  vite.config.js
  index.html
README.md (this file)
```

## Environment Variables
Create a `.env` in Backend and Frontend.

### Backend `.env`
```
PORT=5000
MONGODB_URI=<your-mongodb-connection-string-root>   # driver adds /test in code
JWT_SECRET_KEY=<jwt-secret>                         # referenced in config.js
CLOUDINARY_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_SECRET=<cloudinary-secret>
IMAGEKIT_PUBLIC_KEY=<imagekit-public-key>
IMAGEKIT_PRIVATE_KEY=<imagekit-private-key>
IMAGEKIT_URL_ENDPOINT=<imagekit-url-endpoint>
GEMINI_API_KEY=<google-gemini-api-key>
NODE_ENV=development
```

> Note: In `auth.middleware.js` there's a likely typo: `config.jwtScret` vs `config.jwtSecret`. Ensure consistency or authentication will fail for protected routes.
> Also Server currently signs tokens with hardcoded string `"jwtsecretkey"` instead of `JWT_SECRET_KEY`; consider refactoring for consistency & security.

### Frontend `.env`
```
VITE_API_URL=<backend-base-url>   # e.g. https://vibevault-backend.onrender.com
```

## API Overview
Base URL: `<backend-base-url>`

Auth Routes (`/auth`):
- POST `/register` { UserName, Password }
- POST `/login` { username, password }
- GET  `/status`  (Requires Bearer token header OR cookie depending on middleware logic)
- POST `/logout`

Song Routes (`/songs`):
- POST `/upload` (multipart/form-data: image?, audio, fields: name, artist, mood)
- GET  `/get` (fetch all songs)
- GET  `/search?query=...` (search by name/artist/mood)
- GET  `/get-songs/:mama` (get song by ID)
- POST `/mood` { text } (AI mood detection + song list)

### Response Shape
Successful responses use:
```
{
  "statusCode": 200,
  "data": <payload>,
  "message": "...",
  "success": true
}
```
Errors throw `ApiError` with similar structure.

## Running Locally (Windows PowerShell)
### Prerequisites
- Node.js LTS
- MongoDB Atlas URI or local Mongo service
- Cloudinary & (optionally) ImageKit accounts
- Google AI Studio API key (Gemini)

### 1. Clone & Install
```powershell
# install backend deps
cd "Song app/Backend"; npm install; cd ../..
# install frontend deps
cd "Song app/Frontend"; npm install; cd ../..
```

### 2. Configure Environment
Create `.env` files as described above.

### 3. Run Development Servers
```powershell
# Backend (with nodemon)
cd "Song app/Backend"; npm run dev
# Frontend (Vite)
cd "Song app/Frontend"; npm run dev
```
Vite default: http://localhost:5173
Backend default: http://localhost:5000

### 4. Set Frontend API URL
Ensure `VITE_API_URL` matches backend (e.g. `http://localhost:5000`). Restart Vite if changed.

## Deployment Notes
### Frontend (Vercel)
- Add `VITE_API_URL` in Vercel Project Settings -> Environment Variables.
- Re‑deploy after changes.

### Backend (Render)
- Add all backend environment variables.
- Ensure build command: `npm install` & start command: `node index.js` (or `npm start`).
- Configure health check (optional) at `/auth/status`.
- Enable auto‑deploy on GitHub push.

### CORS
Allowed origins configured in `app.js`:
```
http://localhost:5173
https://vibevault.vercel.app
https://vibe-vault-topaz.vercel.app
```
Add / adjust as needed for custom domains.

## Security & Improvements (Recommended)
- Unify JWT secret usage (remove hardcoded `"jwtsecretkey"`).
- Fix typo `jwtScret` -> `jwtSecret` in `auth.middleware.js` or adjust config export.
- Hash environment secrets & never commit `.env`.
- Add rate limiting & helmet for production hardening.
- Add input validation (e.g., zod / express-validator).
- Add pagination for song list.
- Add refresh tokens & proper cookie flags (httpOnly, secure in prod, sameSite).
- Move mood detection prompt to a more resilient structured output format.

## Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized on `/auth/status` | Token field name mismatch (`jwtScret` typo) | Align config key & token signing secret |
| CORS error | Missing origin in whitelist | Add origin to `allowedOrigins` array |
| Mood route returns 500 | Gemini API key invalid / quota exceeded | Verify `GEMINI_API_KEY` |
| Audio upload fails | Cloudinary resource type mismatch | Use `resource_type: 'video'` or `auto` |
| Empty song list | DB empty | Upload songs via `/songs/upload` |

## License
MIT (add LICENSE file if desired)

## Acknowledgements
- Google Gemini API
- Cloudinary & ImageKit
- Vite, React, Redux Toolkit
- Tailwind CSS

---
Happy hacking with VibeVault! 🎵
