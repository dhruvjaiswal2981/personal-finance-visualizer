"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define types for budget data
interface Budget {
  category: string;
  amount: number;
}

interface ChartData {
  category: string;
  budget: number;
  actual: number;
}

export default function BudgetVsActualChart() {
  // Use proper type for data state
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch('/api/budgets')
      .then((res) => res.json())
      .then((budgets: Budget[]) => {
        // Create actual data with proper type
        const actualData: ChartData[] = budgets.map((budget) => ({
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
