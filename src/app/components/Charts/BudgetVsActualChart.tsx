"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BudgetVsActualChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/budgets')
      .then(res => res.json())
      .then(budgets => {
        const actualData = budgets.map((budget: any) => ({
          category: budget.category,
          budget: budget.amount,
          actual: 0, // You can fill this based on the transactions for each category
        }));
        setData(actualData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="budget" fill="#8884d8" />
        <Bar dataKey="actual" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
