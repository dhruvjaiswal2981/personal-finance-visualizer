"use client";

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define types
interface Transaction {
  date: string;
  amount: number;
}

interface MonthlyData {
  name: string;
  expense: number;
}

export default function MonthlyExpensesChart() {
  const [data, setData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then((transactions: Transaction[]) => {
        const monthlyData = transactions.map((transaction) => ({
          name: transaction.date.slice(0, 7), // Get the year-month part
          expense: transaction.amount,
        }));
        setData(monthlyData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
