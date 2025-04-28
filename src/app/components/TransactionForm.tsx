'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { useEffect, useState } from 'react';

// Define the form schema
const formSchema = z.object({
  amount: z.number(),
  date: z.string(),
  description: z.string(),
  category: z.string(),
});

// Infer the form types from Zod schema
type FormData = z.infer<typeof formSchema>;

// Define the category type (based on API response)
type Category = {
  name: string;
};

export default function TransactionForm() {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories from the API and update state
    fetch('/api/categories')
      .then(res => res.json())
      .then((data: Category[]) => setCategories(data.map((c) => c.name)));
  }, []);

  const onSubmit = async (data: FormData) => {
    const amount = parseFloat(String(data.amount));
    const date = new Date(data.date);

    if (isNaN(amount) || isNaN(date.getTime())) {
      alert("Invalid input values.");
      return;
    }

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
