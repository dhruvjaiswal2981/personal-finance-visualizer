# Personal Finance Visualizer

- A simple and elegant web application to help you track transactions, manage budgets, and visualize expenses using interactive charts.
Built with Next.js 14, TailwindCSS, Prisma ORM, and Sqlite.

## 🚀 Features

- Add, edit, and delete transactions.
- Create and view budgets for different categories.
- Add custom categories.
- Visualize monthly expenses, category-wise expense distribution, and budget vs actual spending using interactive charts.
- Fully responsive design with a beautiful and clean UI.

## 📂 Project Structure

```bash
personal-finance-visualizer/
    ├── app/
    │   ├── api/
    │   │   ├── transactions/
    │   │   ├── budgets/
    │   │   └── categories/
    │   ├── dashboard/
    │   └── page.tsx
    ├── components/
    │   ├── TransactionForm.tsx
    │   ├── TransactionList.tsx
    │   ├── BudgetForm.tsx
    │   ├── CategoryForm.tsx
    │   ├── Dashboard.tsx
    │   └── Charts/
    │       ├── MonthlyExpensesChart.tsx
    │       ├── CategoryPieChart.tsx
    │       └── BudgetVsActualChart.tsx
    ├── lib/
    │   └── prisma.ts
    ├── prisma/
    │   └── schema.prisma
    ├── public/
    ├── styles/
    │   └── globals.css
    ├── tailwind.config.ts
    ├── package.json
    ├── README.md
    └── .env
```

## 📜 API Endpoints

1. Transactions
    - POST /api/transactions → Create a new transaction
    - GET /api/transactions → Retrieve all transactions
    - PUT /api/transactions/[id] → Update a transaction
    - DELETE /api/transactions/[id] → Delete a transaction

2. Categories
    - GET /api/categories → Retrieve list of predefined categories
    - POST /api/categories → Create a new category

3. Budgets
    - POST /api/budgets → Create or update a budget for a category
    - GET /api/budgets → Retrieve all budgets

## 🛠️ Setup Instructions
- Follow these steps to set up the project locally:

1. Clone the repository
```bash
git clone https://github.com/dhruvjaiswal2981/personal-finance-visualizer.git
cd personal-finance-visualizer
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment Variables
Create a .env file in the root folder with the following variables:
```bash
DATABASE_URL="your_database_connection_string"
```

4. Setup Database
- Run Prisma migrations to set up the database:
```bash
npx prisma migrate dev --name init
```

5. Run the development server

```bash
npm run dev
```
- Open http://localhost:3000 to view the app.

## 🎯 Summary of Features
- 📥 Add new transactions with title, amount, and category
- 📋 View a list of all recent transactions
- 🏦 Set budgets for different expense categories
- 📊 Visualize spending trends across months
- 🧩 Pie chart showing category-wise expense distribution
- 🎯 Track how actual expenses compare to your budgets
- 🎨 Modern and fully responsive UI using TailwindCSS
- 🔐 API built with Next.js route handlers and Prisma ORM

## 🚀 Deployment

- Frontend Deployment
    - Live Demo: The application is hosted on Vercel.
    - Access it here: 
## Live Demo

- Demo Video Link : https://drive.google.com/file/d/1xmXHBJPFcyV_GQ6iQ4A-AmrZ661WbO9a/view?usp=sharing

## 📌 Author
- 💻 Developed by Dhruv Jaiswal
- 🚀 Happy Coding! 🎉