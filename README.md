# Lendsqr Frontend Assessment

A pixel-perfect implementation of the Lendsqr Admin Console, built with modern React, TypeScript, and SCSS.

## 🚀 Live Demo

[View Live Demo](https://lendsqr-fe-test.vercel.app) *(Replace with actual deployment URL)*

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Design Decisions](#design-decisions)

## 🛠 Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS (Sass) with CSS Modules
- **State Management:**
  - **Server State:** TanStack Query (React Query)
  - **Client State:** React Context (Authentication)
- **Routing:** React Router v6
- **Testing:** Vitest + React Testing Library
- **Data Persistence:** localStorage (for user details caching)

## ✨ Features

### Authentication
- Email and password validation
- Password visibility toggle
- Persistent login session via localStorage
- Protected routes

### Users Dashboard
- 📊 Statistics cards showing user metrics
- 📋 Sortable and filterable users table
- 🔍 Advanced filtering by organization, username, email, phone, date, and status
- 📄 Pagination with configurable page sizes (10, 20, 50, 100)
- ⚡ Optimistic data fetching with React Query

### User Details
- 💾 localStorage caching for instant load on return visits
- 📱 Comprehensive user information display
- 🔄 Tabbed navigation (General Details, Documents, Bank Details, etc.)
- 👤 User tier visualization with star rating
- 👥 Multiple guarantor support

### Design & UX
- 🎨 100% pixel-perfect implementation from Figma designs
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible with ARIA labels and semantic HTML
- 🎯 Smooth animations and transitions

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lendsqr-fe-test.git
cd lendsqr-fe-test/Lendsqr_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5177`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Lendsqr_dashboard/
├── public/
│   ├── users.json              # Fallback data (500 user records)
│   └── login-illustration.svg
├── src/
│   ├── assets/                 # Static assets (images, fonts)
│   ├── components/
│   │   ├── common/            # Reusable atoms (Button, Input, StatusBadge, Loader)
│   │   └── layout/            # Layout components (Sidebar, Header, DashboardLayout)
│   ├── hooks/                 # Custom React hooks (useLocalStorage)
│   ├── pages/
│   │   ├── Login/            # Login page with authentication
│   │   ├── Dashboard/        # Users list with filtering and pagination
│   │   └── UserDetails/      # Detailed user information view
│   ├── services/             # API service layer (user.service.ts)
│   ├── store/                # Global state (auth-context.tsx)
│   ├── styles/               # Global SCSS (_variables, _mixins, _global)
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Helper functions and utilities
│   ├── test/                 # Test configuration and setup
│   ├── App.tsx               # Root component with routing
│   └── main.tsx              # Application entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🧪 Testing

Run all tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

### Test Coverage

All core components and pages include comprehensive tests:
- ✅ Button, Input, StatusBadge, Loader components
- ✅ Login page (validation, authentication, password toggle)
- ✅ Dashboard page (data fetching, filtering, pagination)
- ✅ UserDetails page (data display, localStorage caching)

## 📊 Mock Data Generation

The 500-user dataset (`public/users.json`) was generated using [JSON Generator](https://next.json-generator.com/):

1. **Generation Process:**
   - Created a custom template matching the `IUser` interface
   - Generated 500 records in two batches of 250 (platform limit)
   - Merged batches into a single JSON array

2. **Data Distribution:**
   - Local: `public/users.json` (primary source)
   - Remote: [GitHub Gist](https://gist.githubusercontent.com/AshNotGrey/7c7695dc264edb3a5aa28c4a871ddaf6) (backup)

3. **Schema Adherence:**
   - All fields strictly typed per `IUser` interface
   - Nigerian-centric data (NGN currency, local banks, phone formats)
   - Realistic relationships between nested objects (guarantors, employment, etc.)

## 🔐 Environment Variables

No environment variables are required. The app automatically fetches the
remote GitHub Gist first and falls back to the bundled `public/users.json`
file if the network request fails.

## 🎯 Design Decisions

For detailed architectural decisions and rationale, see [TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md)

### Key Highlights:

1. **TanStack Query** for server state management
   - Automatic caching and background refetching
   - Better than useState + useEffect for API calls

2. **SCSS Modules** for styling
   - No CSS-in-JS or UI libraries (per requirements)
   - Full design control for pixel-perfect implementation

3. **localStorage** for user details caching
   - Instant load on return visits
   - Demonstrates client-side data persistence

4. **Data Strategy**
   - Primary: Local JSON file (500 records)
   - Generated via json-generator.com in batches of 250
   - Ensures consistent, deterministic demo experience

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run lint         # Lint code
```

## 🤝 Assessment Criteria Met

✅ **Visual Fidelity:** 100% pixel-perfect implementation from Figma  
✅ **Code Quality:** Well-structured, TypeScript strict mode, JSDoc comments  
✅ **Best Practices:** Modern React patterns, accessibility, semantic HTML  
✅ **Testing:** Comprehensive unit tests with positive and negative scenarios  
✅ **GitHub Quality:** Clear commit history, detailed README, technical documentation  
✅ **Naming Conventions:** Consistent, descriptive names throughout  
✅ **Responsiveness:** Mobile-first, fully responsive design  

## 📄 License

This project was created as part of the Lendsqr frontend engineering assessment.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

Built with ❤️ for the Lendsqr Frontend Engineering Assessment

