## Railway Backend

Express + MongoDB API powering authentication, bookings, payments, notifications, and profile management.

### Stack
- Node.js, Express 5, Mongoose 8
- Auth: JWT access/refresh, Passport Google OAuth2
- Payments: Razorpay order + signature verify
- Mail: Mailgen + Nodemailer (Mailtrap creds), email verification and reset flows
- Storage/services: Cloudinary references for avatars (handled client-side), cookies via cookie-parser, validation via express-validator

### Main modules
- App/bootstrap: [app.js](Backened/app.js), [index.js](Backened/index.js), DB connect in [db/index.js](Backened/db/index.js)
- Auth/user: routes in [routes/auth.routes.js](Backened/routes/auth.routes.js); controllers in [controllers/auth.controllers.js](Backened/controllers/auth.controllers.js) and [controllers/user.controllers.js](Backened/controllers/user.controllers.js); JWT guard [middlewares/auth.middleware.js](Backened/middlewares/auth.middleware.js); Passport Google in [passport/index.js](Backened/passport/index.js)
- Payments & bookings: [routes/paymentRoutes.js](Backened/routes/paymentRoutes.js) with Razorpay flows + booking CRUD in [controllers/paymentController.js](Backened/controllers/paymentController.js); shared booking fetch in [routes/bookingRoutes.js](Backened/routes/bookingRoutes.js)
- Notifications: [routes/notificationRoutes.js](Backened/routes/notificationRoutes.js) using [controllers/notificationController.js](Backened/controllers/notificationController.js)
- Models: User plus booking/notification/payment schemas in [models](Backened/models)
- Utilities: Mail helper [utils/mail.js](Backened/utils/mail.js), response/error wrappers in [utils](Backened/utils)

### API surface (high level)
- Auth: register, login, logout, refresh, current-user, change-password, forgot/reset password, email verify/resend, Google OAuth callback (with conditional redirect to /doc for missing details).
- User: update-profile
- Payments/Bookings: create-order, verify, failure hook, list bookings, booking detail, cancel booking
- Notifications: list, mark read/read-all, delete one/all

### Environment variables
Create `.env` in `Backened/` (already gitignored). Required keys:
- `PORT` (default 3000)
- `MONGO_URI`
- `CORS_ORIGIN` (comma list; e.g. http://localhost:5173)
- `CLIENT_URL` (frontend base for email links)
- `FORGOT_PASSWORD_REDIRECT_URL` (frontend reset path)
- `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `MAILTRAP_SMTP_HOST`, `MAILTRAP_SMTP_PORT`, `MAILTRAP_SMTP_USER`, `MAILTRAP_SMTP_PASS`, `EMAIL_USER`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### Scripts
- `npm run dev` start with nodemon
- `npm start` start with node

### Run locally
1) `cd Backened`
2) `npm install`
3) Add `.env` with values above
4) Start MongoDB locally or point `MONGO_URI` to your cluster
5) `npm run dev`

### Notes
- All protected routes expect JWT via cookie `accessToken` or `Authorization: Bearer <token>`.
- Payment amounts are capped for test mode; booking reference IDs are generated per booking type.
- Mail uses Mailtrap credentials for development; swap to production SMTP as needed.
