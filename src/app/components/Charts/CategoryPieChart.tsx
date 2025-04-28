"use client";

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  category: string;
  amount: number;
}

interface CategoryData {
  name: string;
  value: number;
}

export default function CategoryPieChart() {
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then((transactions: Transaction[]) => {
        const categoryData = transactions.reduce((acc: { [key: string]: number }, curr: Transaction) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
        }, {});
        
        // Ensure data is mapped correctly with explicit types for name and value
        const formattedData: CategoryData[] = Object.entries(categoryData).map(
          ([category, amount]: [string, number]) => ({ name: category, value: amount })
        );
        
        setData(formattedData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
