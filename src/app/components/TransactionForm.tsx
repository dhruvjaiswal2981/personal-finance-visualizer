'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  amount: z.number(),
  date: z.string(),
  description: z.string(),
  category: z.string(),
});

export default function TransactionForm() {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories from the API and update state
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.map((c: any) => c.name)));
  }, []);

  const onSubmit = async (data: any) => {
    // Ensure the amount is a number and date is a proper Date object
    const amount = parseFloat(data.amount);
    const date = new Date(data.date);

    if (isNaN(amount) || !date.getTime()) {
      // Handle error, e.g., show a message to the user
      alert("Invalid input values.");
      return;
    }

    // Send the request to the API
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        amount: amount,
        date: date.toISOString(),
      }),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Amount input */}
      <Input
        {...register('amount', { valueAsNumber: true })}
        type="number"
        placeholder="Amount"
        step="any" // Allow decimal values
      />

      {/* Date input */}
      <Input
        {...register('date')}
        type="date"
        placeholder="Date"
      />

      {/* Description input */}
      <Input {...register('description')} placeholder="Description" />

      {/* Category Select dropdown */}
      <Select {...register('category')}>
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </Select>

      {/* Submit Button */}
      <Button>Add Transaction</Button>
    </form>
  );
}
