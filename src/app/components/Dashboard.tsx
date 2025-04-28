'use client'; 

import { useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import MonthlyExpensesChart from './Charts/MonthlyExpensesChart';
import CategoryPieChart from './Charts/CategoryPieChart';
import BudgetVsActualChart from './Charts/BudgetVsActualChart';
import BudgetForm from './BudgetForm';
import CategoryForm from './CategoryForm';

export default function Dashboard() {
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-b from-indigo-100 via-white to-indigo-100">
      <h1 className="text-5xl font-bold text-center text-indigo-800 mb-16">Personal Finance Dashboard</h1>

      {/* Buttons Section */}
      <section className="flex flex-col md:flex-row md:justify-center items-center gap-6 mb-12">
        <button
          onClick={() => setShowBudgetForm((prev) => !prev)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          {showBudgetForm ? 'Hide Budget Form' : '➕ Add Budget'}
        </button>

        <button
          onClick={() => setShowCategoryForm((prev) => !prev)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          {showCategoryForm ? 'Hide Category Form' : '📂 Add Category'}
        </button>
      </section>

      {/* Conditional Forms */}
      {showBudgetForm && (
        <section className="bg-white p-8 rounded-2xl shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Budget</h2>
          <BudgetForm />
        </section>
      )}

      {showCategoryForm && (
        <section className="bg-white p-8 rounded-2xl shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Category</h2>
          <CategoryForm />
        </section>
      )}

      {/* Transaction Form */}
      <section className="bg-white p-8 rounded-2xl shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add a Transaction</h2>
        <TransactionForm />
      </section>

      {/* Transaction List */}
      <section className="bg-white p-8 rounded-2xl shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recent Transactions</h2>
        <TransactionList />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Monthly Expenses Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">📈 Monthly Expenses</h3>
          <MonthlyExpensesChart />
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">🍰 Expense Distribution</h3>
          <CategoryPieChart />
        </div>

        {/* Budget vs Actual Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">🎯 Budget vs Actual</h3>
          <BudgetVsActualChart />
        </div>
      </section>
    </div>
  );
}
