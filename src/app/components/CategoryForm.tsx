// components/CategoryForm.tsx
"use client";

import { useState } from 'react';

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { name: categoryName };

    try {
      const res = await fetch('/api/categories', {  // Updated URL to match API route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Reset form after successful submission
        setCategoryName('');
        alert('Category added successfully');
      } else {
        alert('Error adding category');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="mt-2 w-full border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400">
          Add Category
        </button>
      </div>
    </form>
  );
}
