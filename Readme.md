# Pharmacy Management System

A modern Pharmacy Management System built with **React.js** (using TypeScript) for the frontend and integrated with a **GraphQL API** to handle data operations. This application provides an intuitive interface for managing inventory and tracking sales in a pharmacy.

## Features

- **Inventory Management**: Add, update, and delete pharmaceutical products.
- **Search and Filter**: Easily search and filter products or records.
- **Sales Tracking**: Track daily, weekly, and monthly sales.
- **User Authentication**: Secure login and role-based access.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **GraphQL API Integration**: Seamless integration with GraphQL for efficient data fetching and updates.

## Technologies Used

### Frontend
- **React.js** with **TypeScript**: For building a robust, type-safe UI.
- **React Router**: For routing and navigation.
- **Mantine-UI** (or any UI library): For a modern and responsive design.
- **Apollo Client**: For managing GraphQL queries and state.

### Backend
- **GraphQL API**: For handling CRUD operations and data communication.
- **Node.js** and **Express.js**: To serve the GraphQL API.
- **Prisma**: For database ORM and schema management.
- **PostgreSQL** (or any database): As the data store.

## Prerequisites

- **Node.js** (v16 or above)
- **npm** or **yarn**
- A running **GraphQL API** backend.

## Installation

### 1. Clone the frontend repository:
```bash
git clone https://github.com/itobuztech/pharmastock-frontend
cd pharmacy-frontend
```

### 2. Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```

### 3. Configure environment variables:
```bash
VITE_PHARMA_STOCK_API_URL=<GraphQL API URL>
```

### 4. Start the development server:
```bash
npm run start
```
or
```bash
yarn start
```

The application will be available at http://localhost:3000.

### Scripts
npm start: Starts the development server.
npm build: Builds the project for production.
npm lint: Lints the codebase for best practices.

### Backend repo:
- https://github.com/itobuztech/pharmastock-backend

### Credentials:
- Super Admin:
email: palashSuperAdmin@itobuz.com
password: Itobuz#1234

- Admin:
email: sudeepAdmin.healthfirst@itobuz.com
password: Itobuz#1234

- Staff:
email: kaustavi+staff+3@itobuz.com
password: Itobuz#1234

