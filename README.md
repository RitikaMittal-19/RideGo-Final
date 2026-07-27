<div align="center">

<img src="Frontend/src/assets/ridelogo.png" alt="RideGo Logo" width="120" />

# RideGo

**A real-time, two-sided ride-hailing platform connecting Riders and Drivers.**

Built with the MERN stack, Socket.IO, and the Google Maps Platform.

[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?logo=mongodb&logoColor=white)](#)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socket.io&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

</div>

---

## Overview

RideGo is a full-stack, Uber-style ride-hailing application with two distinct client experiences — **Users** (riders) and **Captains** (drivers) — sharing one backend. Users can search for pickup/destination locations with autocomplete, see live fare estimates across vehicle tiers, request a ride, and track their driver in real time. Captains receive nearby ride requests over a live socket connection, accept them, verify pickup with an OTP, and complete the trip.

The project is split into two independently deployable applications:

- **`Backend/`** — a REST API (Express 5) with JWT authentication, MongoDB persistence (Mongoose), and a Socket.IO server for real-time events.
- **`Frontend/`** — a Vite + React 19 single-page app with Tailwind CSS, GSAP-animated UI panels, and Google Maps live tracking.

> This README was generated directly from the source code — every feature, endpoint, and environment variable listed below is verified against the actual implementation.

---

## Features

**Rider (User) side**
- Email/password signup & login with client + server-side validation
- Address autocomplete and reverse geocoding via Google Maps
- Live fare estimate across three vehicle types (Auto, Car, Moto) before booking
- Real-time ride status updates (confirmed → driver assigned → ride started) via Socket.IO
- Live map view with current location tracking
- OTP displayed to the rider for secure pickup verification

**Driver (Captain) side**
- Separate signup/login flow with vehicle details (color, plate, capacity, vehicle type)
- Real-time incoming ride request popups for captains within a live radius of the pickup point
- Accept / ignore ride requests
- OTP-based ride start confirmation
- "Finish Ride" flow to close out a trip
- Periodic live location broadcast to the server over Socket.IO

**Platform-wide**
- Stateless JWT authentication, delivered via both `httpOnly` cookie and bearer token
- Token blacklisting on logout (TTL-indexed collection, auto-expires after 24h)
- Protected client-side routes (`UserProtectWrapper`, `CaptainProtectWrapper`) that verify the session against `/profile` before rendering
- Ride lifecycle state machine: `pending → accepted → ongoing → completed` (or `cancelled`)
- Server-side dynamic fare engine based on live distance & duration from Google Distance Matrix

---

## Screenshots

> _Add real screenshots/GIFs here before publishing — placeholders below._

| Start Screen | Find a Trip | Choose Vehicle | Live Ride Tracking |
|---|---|---|---|
| `docs/screenshots/start.png` | `docs/screenshots/find-trip.png` | `docs/screenshots/vehicle-panel.png` | `docs/screenshots/live-tracking.png` |

| Captain — Incoming Request | Captain — OTP Confirm | Captain — Finish Ride |
|---|---|---|
| `docs/screenshots/captain-ride-popup.png` | `docs/screenshots/captain-confirm-otp.png` | `docs/screenshots/captain-finish-ride.png` |

---

## Demo

- **Backend (live API):** `https://ridego-final-production.up.railway.app` — deployed on [Railway]
- **Frontend (live app):** _add your deployed frontend URL here (e.g. Vercel/Netlify)_

---

## Tech Stack

### Frontend (`/Frontend`)
| Category | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`), Remixicon |
| Animation | GSAP + `@gsap/react` |
| Maps | `@react-google-maps/api` (Google Maps JS SDK) |
| Realtime | `socket.io-client` |
| HTTP | Axios |
| Linting | ESLint 9 |

### Backend (`/Backend`)
| Category | Technology |
|---|---|
| Runtime / Framework | Node.js, Express 5 |
| Database / ODM | MongoDB, Mongoose 8 |
| Auth | JSON Web Tokens (`jsonwebtoken`), `bcrypt` password hashing |
| Realtime | Socket.IO 4 |
| Validation | `express-validator` |
| Middleware | `cors`, `cookie-parser`, `dotenv` |
| External APIs | Google Maps: Geocoding, Distance Matrix, Places Autocomplete (via `axios`) |

### Database Collections
| Collection | Purpose |
|---|---|
| `users` | Rider accounts |
| `captains` | Driver accounts + vehicle info + live location |
| `rides` | Ride requests and lifecycle state |
| `blacklisttokens` | Logged-out JWTs (TTL index, auto-expires in 24h) |

---

## Architecture

```
                       ┌─────────────────────────┐
                       │        Frontend         │
                       │  React 19 SPA (Vite)     │
                       │  Tailwind + GSAP UI      │
                       └────────────┬─────────────┘
                                    │ REST (Axios)      │ WebSocket
                                    ▼                    ▼
                       ┌─────────────────────────────────────┐
                       │              Backend                │
                       │         Express 5 + Socket.IO        │
                       │  /users  /captains  /maps  /rides    │
                       │  JWT auth middleware, validators      │
                       └───────┬───────────────────┬──────────┘
                               │                    │
                    ┌──────────▼─────────┐  ┌───────▼─────────────┐
                    │   MongoDB (Atlas)   │  │  Google Maps Platform│
                    │ users / captains /  │  │ Geocoding, Distance  │
                    │ rides / blacklist   │  │ Matrix, Places API   │
                    └─────────────────────┘  └──────────────────────┘
```

**Request flow (happy path — booking a ride):**
1. User authenticates → JWT issued (cookie + returned token, stored in `localStorage` on the client).
2. User types pickup/destination → `GET /maps/get-suggestions` (Places Autocomplete) powers the location search panel.
3. User taps "Find Trip" → `GET /rides/get-fare` computes fares for `auto`/`car`/`moto` from Google Distance Matrix data.
4. User confirms → `POST /rides/create` persists the ride (status `pending`) with a 6-digit crypto-random OTP, geocodes the pickup address, finds nearby captains via a MongoDB radius query, and emits a `new-ride` Socket.IO event to each of them.
5. A captain accepts → `POST /rides/confirm` sets status `accepted` and emits `ride-confirmed` back to the rider's socket.
6. Captain verifies the rider's OTP on pickup → `GET /rides/start-ride` sets status `ongoing`, emits `ride-started`.
7. Captain ends the trip → `POST /rides/end-ride` sets status `completed`, emits `ride-ended`.

---

## Folder Structure

```
RideGo/
├── Backend/
│   ├── app.js                     # Express app: middleware + route mounting
│   ├── server.js                  # HTTP server bootstrap + Socket.IO init
│   ├── socket.js                  # Socket.IO connection & event handlers
│   ├── db/
│   │   └── db.js                  # Mongoose connection
│   ├── models/
│   │   ├── user.model.js
│   │   ├── captain.model.js
│   │   ├── ride.model.js
│   │   └── blacklistToken.model.js
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── captain.controller.js
│   │   ├── ride.controller.js
│   │   └── map.controller.js
│   ├── services/
│   │   ├── user.service.js
│   │   ├── captain.service.js
│   │   ├── ride.service.js
│   │   └── maps.service.js
│   ├── middlewares/
│   │   └── auth.middleware.js     # authUser / authCaptain JWT guards
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── captain.routes.js
│   │   ├── ride.routes.js
│   │   └── maps.routes.js
│   └── package.json
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx                # Provider tree: Socket → Router → User/Captain context
        ├── App.jsx                 # Route definitions
        ├── config/api.js           # Axios instance (baseURL from env)
        ├── context/
        │   ├── UserContext.jsx
        │   ├── CaptainContext.jsx
        │   └── SocketContext.jsx
        ├── pages/
        │   ├── Start.jsx
        │   ├── UserLogin.jsx / UserSignup.jsx / UserLogout.jsx / UserProtectWrapper.jsx
        │   ├── CaptainLogin.jsx / CaptainSignup.jsx / CaptainProtectWrapper.jsx
        │   ├── Home.jsx             # Main rider booking flow
        │   ├── Riding.jsx           # Rider's in-progress ride screen
        │   ├── CaptainHome.jsx      # Main captain dashboard
        │   └── CaptainRiding.jsx    # Captain's in-progress ride screen
        └── components/
            ├── LocationSearchPanel.jsx
            ├── VehiclePanel.jsx
            ├── ConfirmRide.jsx
            ├── LookingForDriver.jsx
            ├── WaitingForDriver.jsx
            ├── RidePopUp.jsx
            ├── ConfirmRidePopUp.jsx
            ├── FinishRide.jsx
            ├── CaptainDetails.jsx
            └── LiveTracking.jsx     # Google Maps live position marker
```

---

## Installation

### Prerequisites
- Node.js ≥ 18
- A MongoDB connection string (local or [MongoDB Atlas])
- A Google Cloud API key with **Geocoding API**, **Distance Matrix API**, and **Places API** enabled

### Clone & install
```bash
git clone https://github.com/<your-username>/RideGo.git
cd RideGo

# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

---

## Environment Variables

### `Backend/.env`
| Variable | Description | Used in |
|---|---|---|
| `PORT` | Port the Express/Socket.IO server listens on (defaults to `4000`) | `server.js` |
| `DB_CONNECT` | MongoDB connection string | `db/db.js` |
| `JWT_SECRET` | Secret used to sign/verify JWTs | `auth.middleware.js`, `user.model.js`, `captain.model.js` |
| `GOOGLE_MAPS_API` | Google Maps Platform API key (Geocoding, Distance Matrix, Places) | `services/maps.service.js` |

```env
# Backend/.env
PORT=4000
DB_CONNECT=mongodb+srv://<user>:<password>@<cluster>/ridego
JWT_SECRET=your_jwt_secret_here
GOOGLE_MAPS_API=your_google_maps_api_key
```

### `Frontend/.env`
| Variable | Description | Used in |
|---|---|---|
| `VITE_BACKEND_URL` | Base URL of the deployed/local backend API | all API calls, `config/api.js`, `SocketContext.jsx` |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JS SDK key for the client-side map | `components/LiveTracking.jsx` |

```env
# Frontend/.env
VITE_BACKEND_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_js_key
```

> **Note:** `SocketContext.jsx` currently connects to a hardcoded production Railway URL rather than reading `VITE_BACKEND_URL`. Update this to use the env variable before running fully against a local backend (see [Known Issues](#known-issues--future-improvements)).

---

## Running Locally

**1. Start MongoDB** (local install or use an Atlas URI in `DB_CONNECT`).

**2. Start the backend**
```bash
cd Backend
npm install
node server.js
# Server is running on port 4000
```

**3. Start the frontend**
```bash
cd Frontend
npm install
npm run dev
# Vite dev server → http://localhost:5173
```

**4. Open the app**
Visit `http://localhost:5173` — you'll land on the `Start` screen, with links to sign up as a **Rider** or a **Captain**.

---

## Deployment

- **Backend:** Configured for [Railway] — `server.js` binds to `process.env.PORT` on `0.0.0.0`, and the live app currently runs at `ridego-final-production.up.railway.app`. Any Node host (Render, Railway, Fly.io, EC2) works as long as `PORT`, `DB_CONNECT`, `JWT_SECRET`, and `GOOGLE_MAPS_API` are set.
- **Frontend:** A static Vite build (`npm run build` → `dist/`) — deployable to Vercel, Netlify, or any static host. Set `VITE_BACKEND_URL` and `VITE_GOOGLE_MAPS_API_KEY` as build-time environment variables on the hosting platform.
- **Database:** MongoDB Atlas (or any MongoDB instance reachable from the backend host).

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please open an issue first for major changes, and keep PRs focused on a single concern (bug fix, feature, or refactor).

---

## License

Distributed under the MIT License. See `LICENSE` for more information.