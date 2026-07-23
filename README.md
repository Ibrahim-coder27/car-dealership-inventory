# Car Dealership Inventory System

A full-stack, single-page application (SPA) built to design, manage, and test a Car Dealership Inventory System. The application consists of a robust Express-based REST API backend and a premium React + Tailwind CSS client dashboard frontend, developed adhering to Test-Driven Development (TDD) best practices.

---

## Technical Stack

### Backend API
- **Runtime**: Node.js
- **Framework**: Express (v5)
- **Database**: MongoDB (Mongoose Object Modeling)
- **Security**: JWT-based stateless authentication & password hashing via Bcrypt
- **Testing**: Jest & Supertest

### Frontend SPA
- **Framework**: React (v19)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Form State**: React Hook Form
- **Testing**: Vitest & React Testing Library

---

## Features

### Authentication & Authorization
- Secure JWT-based registration and login flows.
- User roles: `customer` and `admin`.
- Role-based registration dropdown to easily toggle and test customer vs. admin dashboards.

### Dashboard & Inventory
- Beautiful glassmorphic UI layout with dark/blue themed headers.
- Visual statistics panel computing total models, total stock volume, out of stock models, and low stock warnings (under 3 items) in real time.
- Dynamic vehicle cards showcasing car details (Make, Model, Category), price, and stock levels.
- Responsive design tailored for all devices (mobile, tablet, desktop).

### Search & Filtering
- Search and filter controls targeting make, model, category, and price range (min/max).
- Uses backend search logic (`GET /api/vehicles/search`).

### Operations
- **Purchase Vehicle**: Any authenticated user can purchase a vehicle. Clicking "Purchase" decrements the quantity of the vehicle in the database and reflects in the UI with a toast notification.
- **Admin Section (Admin Only)**:
  - Add New Vehicle Modal (fields: Make, Model, Category, Price, Quantity).
  - Edit Vehicle Details Modal.
  - Restock Vehicle Modal (easily add stock numbers).
  - Delete Vehicle with dynamic confirmations.

---

## Setup & Running the Project

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- A running MongoDB instance or connection URI (pre-configured in `.env`)

---

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```
4. Run the Jest test suite:
   ```bash
   npm test
   ```

---

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```
4. Run the Vitest test suite:
   ```bash
   npm test
   ```

---

## Test Report

Both the backend and frontend include 100% passing test suites verifying authentication middleware, endpoints, routers, hooks, and page renderings.

### Backend Jest Results:
```text
Test Suites: 13 passed, 13 total
Tests:       43 passed, 43 total
Snapshots:   0 total
Time:        25.666 s
```

### Frontend Vitest Results:
```text
Test Files  10 passed (10)
Tests       16 passed (16)
Duration    11.38s
```

---

## My AI Usage

### AI Tools Used
- Google Gemini 3.5 Flash via Antigravity IDE

### How They Were Used
- **Boilerplate & Routing configuration**: Configured clean context encapsulation inside `<App />` and adjusted tests (`LoginPage.test.jsx`, `RegisterPage.test.jsx`, `AppRouter.test.jsx`) to include `MemoryRouter` and `AuthProvider` providers.
- **Service Layer Development**: Created `vehicleService.js` to coordinate API queries with Axios and mapped correct models.
- **Feature & UI Engineering**: Wrote the React template code for the premium dashboard inside `HomePage.jsx` including statistics counters, state handlers for modals, purchase and restock queries, and dynamic filters.
- **TDD verification & debugging**: Used AI to quickly find that tests were failing due to missing router context or unauthenticated redirects.

### Reflection
The AI assistant drastically sped up UI rendering, layout alignment, and state mapping. By using the AI to analyze failing testing logs, it correctly diagnosed that the `BrowserRouter` was originally mounted only in the root DOM compiler (`main.jsx`), causing isolated page unit tests to throw navigation exceptions. Wrapping routing contexts natively resolved the errors cleanly.
