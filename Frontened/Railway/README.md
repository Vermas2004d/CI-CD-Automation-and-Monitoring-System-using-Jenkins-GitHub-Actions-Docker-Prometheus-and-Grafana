## Railway Frontend

React 19 + Vite single-page app for the Railway experience: search trains, book tickets, explore luxury journeys and tour packages, track live status, manage profile, and handle auth flows.

### Stack
- React 19, React Router 7, Vite (rolldown build), Tailwind CSS 4
- Axios for HTTP, RapidAPI for train data, Cloudinary widget for profile avatars
- UI: lucide-react icons, sonner toasts, framer-motion hooks available

### Features (high level)
- Landing hero with search handoff to the train finder and animated destination highlights ([src/Components/landingPage/Index.jsx](src/Components/landingPage/Index.jsx)).
- Train search with RapidAPI IRCTC between-stations lookup and booking handoff to passenger form ([src/Components/landingPage/TrainSearchPage.jsx](src/Components/landingPage/TrainSearchPage.jsx)).
- Ticket booking flow with passenger details, fare calc, payment kickoff via `initiatePayment` ([src/Pages/BookTicketPage.jsx](src/Pages/BookTicketPage.jsx)).
- Royal luxury journeys showcase with expandable itineraries ([src/Pages/RoyalPage.jsx](src/Pages/RoyalPage.jsx)).
- Tour packages carousel and booking CTA ([src/Pages/TourMainPage.jsx](src/Pages/TourMainPage.jsx)).
- Live train status via RapidAPI endpoint and timeline rendering ([src/Pages/TrainStatusPage.jsx](src/Pages/TrainStatusPage.jsx)).
- Executive chat interface for premium customer support and assistance.
- Profile management with Cloudinary avatar upload and API-backed updates ([src/Services/Profile.jsx](src/Services/Profile.jsx)).
- Auth-related routes for login, signup, verify, reset, change password; new `/doc` page for collecting missing Google profile details; dashboard shell and food/notifications pages available.
- Dashboard hub with sidebar navigation to tickets, tatkal, PNR, seat availability, routes, services, food, tours, royal, history, notifications, help, and profile sections ([src/Components/Dashboard.jsx](src/Components/Dashboard.jsx)).

### Project structure
- Entry: [src/main.jsx](src/main.jsx), router: [src/App.jsx](src/App.jsx)
- Components: landing page, navbar/footer, auth screens, dashboard cards
- Pages: booking, royal journeys, tour packages, food menu, train status, executive chat
- Services: booking history, notifications, profile, seat/PNR/status helpers
- utils: payment helpers, validation

### Environment
Copy the sample and fill real values:
- `cp .env.sample .env`
- Variables used across the app:
	- `VITE_API_URL` base for auth/profile/password endpoints
	- `VITE_API_BASE_URL` general API root
	- `VITE_NOTIFICATION_API_URL` notifications API root
	- `VITE_RAPID_API_KEY` RapidAPI key for train search/status
	- `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` for avatar uploads

### Scripts
- `npm install` install deps
- `npm run dev` start Vite dev server
- `npm run build` production bundle
- `npm run preview` preview production build
- `npm run lint` eslint check

### Running locally
1) `npm install`
2) Create `.env` from `.env.sample` with valid keys
3) `npm run dev` and open the printed localhost URL

### Notes
- Booking flows rely on backend endpoints configured via `VITE_API_URL`; RapidAPI calls require a valid key.
- Cloudinary widget loads dynamically when editing profile images; ensure allowed domains are configured in your Cloudinary settings.
