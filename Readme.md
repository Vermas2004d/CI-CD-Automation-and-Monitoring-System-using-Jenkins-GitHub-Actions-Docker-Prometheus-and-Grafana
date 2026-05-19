## Railway Platform (Full Stack)

End-to-end railway experience with separate frontend (React/Vite) and backend (Express/MongoDB) services covering auth, bookings, payments, notifications, live status, and rich UI journeys.

### Demo 
For more details, images, and videos of how the platform works, visit: [Project Documentation](https://www.notion.so/POST-LINK-2d19aac96f178057a63ce93fc673210e)

### Architecture
- **Frontend**: React 19 + Vite, React Router 7, Tailwind 4, axios, sonner toasts, lucide-react icons.
- **Backend**: Express 5, Mongoose 8, JWT auth + Passport Google OAuth2, Razorpay payments, Mailgen/Nodemailer for email flows.
- **Database**: MongoDB (MONGO_URI).
- **Cloud/media**: Cloudinary avatar uploads (widget used on frontend, URLs stored via backend update).
- **Infrastructure (DevOps)**: Docker containers, Docker Compose orchestration, Jenkins CD, GitHub Actions CI.
- **Monitoring**: Prometheus (metrics scraping) and Grafana (visual dashboards).

### Key Features
- Landing and discovery: animated hero, train search handoff, tours and luxury journeys showcase.
- Search and booking: IRCTC RapidAPI between-stations search, passenger capture, payment kickoff (Razorpay), booking references by type.
- Travel utilities: live train status timeline, PNR status, seat availability, coach seating, routes, train services.
- Food and tours: food ordering flow and curated tour packages (including royal journeys).
- Coolie Booking: optional add-on service for luggage assistance during ticket booking (both regular and tour), reflected in total price and ticket details.
- Account & notifications: signup/login, email verification, password reset, Google OAuth with additional details collection (Doc.jsx), profile with Cloudinary avatar, notifications CRUD, booking history.
- Dashboard hub: sidebar navigation to tickets, tatkal, PNR, seat, route, services, food, tours, royal, history, notifications, help, profile.

### Repos & Paths
- **Frontend app**: `Frontened/Railway`
- **Backend API**: `Backened`
- **Monitoring**: `monitoring/prometheus` & `monitoring/grafana`
- **CI/CD**: `Jenkinsfile` & `.github/workflows/ci.yml`

### DevOps & Monitoring Ecosystem
This application features a fully automated, production-grade DevOps pipeline:
- **Dockerization**: The frontend (Vite/Nginx) and backend (Node.js) are containerized using custom `Dockerfile`s and orchestrated seamlessly using `docker-compose.yml`.
- **Continuous Integration (CI)**: Configured with **GitHub Actions** (`ci.yml`) to automatically build and test Docker images upon every push/pull request to the `main` branch.
- **Continuous Deployment (CD)**: Managed by **Jenkins** (`Jenkinsfile`). It securely fetches `.env` credentials, pulls the latest code, and re-deploys the live Docker Compose stack with zero manual intervention.
- **Monitoring**: **Prometheus** continuously scrapes live system metrics from the backend's `/metrics` endpoint. **Grafana** (pre-provisioned via `datasource.yml`) visualizes this data on port `3001`.

### Environment Variables
Create `.env` files from provided samples/notes.

**Frontend (Frontened/Railway/.env)**
- `VITE_API_URL`, `VITE_API_BASE_URL`, `VITE_NOTIFICATION_API_URL`
- `VITE_RAPID_API_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`

**Backend (Backened/.env)**
- `PORT`
- `MONGO_URI`
- `CORS_ORIGIN` (comma list, e.g. http://localhost:5173)
- `CLIENT_URL`, `FORGOT_PASSWORD_REDIRECT_URL`
- `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `MAILTRAP_SMTP_HOST`, `MAILTRAP_SMTP_PORT`, `MAILTRAP_SMTP_USER`, `MAILTRAP_SMTP_PASS`, `EMAIL_USER`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### Run Locally (Docker - Recommended)
The fastest way to spin up the entire application along with the monitoring tools is via Docker Compose.
1. Make sure Docker Desktop is installed and running.
2. Ensure you have created the `.env` files for both the Backend and Frontend as described above.
3. Open your terminal in the root directory and run:
   ```bash
   docker-compose up -d --build
   ```
4. Access the services:
   - **Frontend Application**: `http://localhost`
   - **Backend API**: `http://localhost:8000`
   - **Prometheus**: `http://localhost:9090`
   - **Grafana**: `http://localhost:3001` (Credentials: admin / admin)

### Run Locally (Manual)
1) **Backend**
	- `cd Backened`
	- `npm install`
	- Add `.env` with keys above and ensure MongoDB reachable
	- `npm run dev`
2) **Frontend**
	- In new shell: `cd Frontened/Railway`
	- `npm install`
	- Copy `.env.sample` to `.env`, set real values
	- `npm run dev`

### Scripts
- Backend: `npm run dev` (nodemon), `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

### Notable Endpoints (backend)
- Auth: register, login, logout, refresh, current-user, change-password, forgot/reset, email verify/resend, Google OAuth callback.
- User: update-profile.
- Payments/Bookings: create-order, verify, failure, list bookings, booking detail, cancel booking.
- Notifications: list, mark read/read-all, delete one/all.

### Frontend Entry Points
- Router setup in [Frontened/Railway/src/App.jsx](Frontened/Railway/src/App.jsx)
- Dashboard in [Frontened/Railway/src/Components/Dashboard.jsx](Frontened/Railway/src/Components/Dashboard.jsx)
- Landing flow in [Frontened/Railway/src/Components/landingPage/Index.jsx](Frontened/Railway/src/Components/landingPage/Index.jsx)

### Notes
- JWT is accepted via cookie `accessToken` or `Authorization: Bearer <token>` on protected backend routes.
- Razorpay amounts are capped for test mode; booking references are generated per booking type.
- Mail setup defaults to Mailtrap for development; adjust SMTP for production.
- Project history: first repository (with original commits) was deleted due to an issue; this is a recreated repo. Estimated effort to rebuild and complete: ~19 days.
- Special thanks to Madhav Verma for contributions.
