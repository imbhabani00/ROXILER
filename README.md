# MERN Stack Coding Challenge

This project is a MERN (MongoDB, Express, React, Node.js) stack application that manages product transactions. It allows you to view transactions, statistics, and graphical representations of data using bar and pie charts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [License](#license)

## Features

- Seed the database with transaction data from an external JSON file.
- List transactions with pagination and search functionality.
- View statistics of transactions including total sale amount, sold items, and unsold items.
- View bar and pie charts representing transaction data.

## Installation

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the backend directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongo_db_uri
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the frontend directory with the following content:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```
4. Start the frontend server:
    ```bash
    npm start
    ```

## Usage

1. Start both the backend and frontend servers as described in the installation section.
2. Open your browser and navigate to `http://localhost:3000` to view the application.
3. Use the dropdown to select a month and view the transactions and statistics for that month.

## Folder Structure

ROXILER
│
├── backend
│ ├── controllers
│ │ └── transactionController.js
│ ├── models
│ │ └── Transaction.js
│ ├── routes
│ │ └── transactionRoutes.js
│ ├── seed
│ │ └── seedDatabase.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend
│ ├── public
│ │ └── index.html
│ ├── src
│ │ ├── components
│ │ │ ├── TransactionTable.js
│ │ │ ├── Statistics.js
│ │ │ ├── BarChart.js
│ │ │ └── PieChart.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── api.js
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── .env
│ └── package.json
│
└── README.md


## API Endpoints

- **Initialize Database**
  - `GET /api/transactions/initialize`
  - Seeds the database with transaction data.

- **List Transactions**
  - `GET /api/transactions/list?month=<month>&page=<page>&perPage=<perPage>&search=<search>`
  - Lists transactions with optional pagination and search.

- **Get Statistics**
  - `GET /api/transactions/statistics?month=<month>`
  - Returns statistics of transactions for the specified month.

- **Get Bar Chart Data**
  - `GET /api/transactions/barchart?month=<month>`
  - Returns data for bar chart representation of transactions.

- **Get Pie Chart Data**
  - `GET /api/transactions/piechart?month=<month>`
  - Returns data for pie chart representation of transactions.

## Frontend Components

- **TransactionTable**
  - Displays a table of transactions with search functionality.

- **Statistics**
  - Displays statistics of transactions including total sale amount, sold items, and unsold items.

- **BarChart**
  - Displays a bar chart of transactions grouped by price ranges.

- **PieChart**
  - Displays a pie chart of transactions grouped by categories.
