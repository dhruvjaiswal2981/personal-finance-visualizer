"use client";

import { useState } from 'react';

export default function BudgetForm() {
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { category, month, amount: parseFloat(amount) };

    try {
      const res = await fetch('/api/budgets', {  // Corrected endpoint URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Reset form after successful submission
        setCategory('');
        setMonth('');
        setAmount('');
        alert('Budget added successfully');
      } else {
        alert('Error adding budget');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 w-full border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Month</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="mt-2 w-full border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400">
          Add Budget
        </button>
      </div>
    </form>
  );
}
