# 🤖 AI Tooling & Prompt Engineering Record

This document provides a comprehensive log of the prompt engineering techniques, architectural guidelines, and iterative development requests used during the pairing session to build the **Car Dealership Inventory System**.

---

## 🧰 AI Stack Overview

| AI Assistant | Role & Area of Focus |
| :--- | :--- |
| **ChatGPT (OpenAI)** | **Backend Architecture & REST API Design**: Used for defining Express v5 routes, MongoDB Mongoose schemas (`User`, `Vehicle`), stateless JWT authentication, password hashing with Bcrypt, and writing automated backend test suites (43 tests) using Jest & Supertest. |
| **Antigravity AI (Google DeepMind)** | **Frontend Engineering & Full-Stack Integration**: Agentic AI assistant used for building the React 19 + Tailwind v4 UI, glassmorphic design system, React Context architecture (`AuthProvider`), Vite dev server proxying, resolving Vitest context failures (16 tests), database seeding (`seed.js`), and end-to-end polish. |

---

## 📋 Professional Prompt Log

### Phase 1: Architectural Assessment & Backend Design (ChatGPT)

#### Prompt 1.1: System Requirements & Architecture Specification
> **Prompt**:
> *"Design a RESTful backend API for a Car Dealership Inventory System using Node.js, Express, and MongoDB with Mongoose. Implement JWT-based authentication supporting two user roles: `customer` and `admin`. Ensure passwords are hashed with bcrypt. Require authentication for vehicle inventory endpoints (`GET /api/vehicles`, `GET /api/vehicles/search`, `POST /api/vehicles`, `PUT /api/vehicles/:id`, `POST /api/vehicles/:id/purchase`). Restrict `DELETE /api/vehicles/:id` and `POST /api/vehicles/:id/restock` to `admin` role only. Provide Jest + Supertest tests covering all endpoints, authentication middleware, and validation rules."*

- **Outcome**: Established clean separation of concerns across `models/`, `controllers/`, `services/`, `middleware/`, and `routes/`. Created 43 Jest tests verifying route security and database constraints.

---

### Phase 2: Frontend Engineering & Design System (Antigravity AI)

#### Prompt 2.1: UI Overhaul & Design System Request
> **Prompt**:
> *"Analyse the existing React frontend and build a stunning, modern Single Page Application interface using Tailwind CSS v4. Create a sticky glassmorphic navbar with logo, navigation links, and active user badge. Implement a dashboard with real-time statistics cards, search and category filters, visual vehicle cards with category-specific gradient banners, and modals for Add, Edit, and Restock operations."*

- **Actions Taken by Antigravity**:
  - Engineered `src/index.css` with `@theme` design tokens (`primary-*`, `surface-*`), Google Inter typography, glassmorphism CSS utilities (`.glass-card`), button styles (`.btn-primary`), and keyframe animations (`fadeInUp`, `scaleIn`, `slideDown`).
  - Created `<Navbar />` component with active route detection and user profile badges.
  - Implemented `<HomePage />` dashboard supporting search filters, category tab filtering, sorting, purchase action buttons, and modal dialogs.

---

### Phase 3: Role Authorization Alignment & Database Seeding (Antigravity AI)

#### Prompt 3.1: Permission Matrix Correction & Database Seeding
> **Prompt**:
> *"Ensure both customer and admin accounts can add (`POST /api/vehicles`), view (`GET /api/vehicles`), search (`GET /api/vehicles/search`), edit (`PUT /api/vehicles/:id`), and purchase (`POST /api/vehicles/:id/purchase`) vehicles, while restricting Delete and Restock actions strictly to Admin accounts. Also create a database seeding script (`npm run seed`) to populate high-quality dummy vehicles into the MongoDB database."*

- **Actions Taken by Antigravity**:
  - Updated `HomePage.jsx` to render the `Add Vehicle` and `Edit` buttons for all authenticated users, while guarding `Restock` and `Delete` buttons behind `user?.role === "admin"`.
  - Created `backend/src/seed.js` with 8 realistic vehicle records (Tesla, Toyota, Ford, Honda, BMW, Chevrolet, Mercedes-Benz, Hyundai) and executed `npm run seed`.

---

### Phase 4: Debugging, Integration & Testing Optimization (Antigravity AI)

#### Prompt 4.1: CORS, Vite Proxy & Context Error Resolution
> **Prompt**:
> *"Resolve registration and login connection failures between Vite dev server (`http://localhost:5173`) and Express backend (`http://localhost:5000`), fix PostCSS import order errors, and ensure all Vitest frontend unit tests pass."*

- **Actions Taken by Antigravity**:
  - Added `cors` middleware to `backend/src/app.js` and set up proxy rules in `frontend/vite.config.js`.
  - Fixed PostCSS import order in `frontend/src/index.css` by moving Google Font `@import` before Tailwind `@import`.
  - Fixed relative imports in `<Navbar />` and wrapped component test renders with `<AuthProvider>` and `<MemoryRouter>` providers.
  - Re-verified all 16 Vitest tests and 43 Jest tests with 100% pass rate.

---

## 🎯 Verification Matrix

| Component | Test Runner | Total Tests | Status |
| :--- | :--- | :---: | :---: |
| **Backend API & Authorization** | Jest & Supertest | 43 / 43 | ✅ PASS |
| **Frontend UI & Components** | Vitest & React Testing Library | 16 / 16 | ✅ PASS |
| **Database Seeding** | Node.js Script (`npm run seed`) | 8 Records | ✅ SEEDED |
| **Git Repository** | Git / GitHub | `main` branch | ✅ PUSHED |
