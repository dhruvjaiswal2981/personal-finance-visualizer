"use client";

import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch('/api/transactions');
        if (!res.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await res.json();
        setTransactions(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const deleteTransaction = async (id: number) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete transaction');
      }
      // Refresh transaction list after deletion
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const editTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setEditMode(true);
  };

  const updateTransaction = async (updatedData: Partial<Transaction>) => {
    if (currentTransaction) {
      try {
        const res = await fetch(`/api/transactions/${currentTransaction.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
          throw new Error('Failed to update transaction');
        }
        // Refresh transaction list after update
        const updatedTransactions = await res.json();
        setTransactions(updatedTransactions);
        setEditMode(false); // Close the edit form after saving
        setCurrentTransaction(null);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner-border animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-green-500 py-4 text-lg">
        <p>{error}</p>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food':
        return '🍕';
      case 'transport':
        return '🚗';
      case 'entertainment':
        return '🎬';
      case 'shopping':
        return '🛍️';
      default:
        return '📦';
    }
  };

  return (
    <div className="space-y-6">
      {editMode && currentTransaction ? (
        <div className="border shadow-md rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const description = (form.elements.namedItem('description') as HTMLInputElement).value;
              const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
              const category = (form.elements.namedItem('category') as HTMLInputElement).value;
              
              updateTransaction({
                description,
                amount,
                category,
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                name="description"
                defaultValue={currentTransaction.description}
                className="mt-2 w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                defaultValue={currentTransaction.amount}
                className="mt-2 w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={currentTransaction.category}
                className="mt-2 w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setEditMode(false);
                  setCurrentTransaction(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border shadow-md rounded-lg p-6 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(transaction.category)}</span>
                    <div className="font-semibold text-xl">{transaction.description}</div>
                  </div>
                  <div className="text-lg text-blue-500 font-bold">₹ {transaction.amount.toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>{new Date(transaction.date).toLocaleDateString()}</div>
                  <div className="text-gray-500 font-medium">{transaction.category}</div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p className="truncate">{transaction.description}</p>
                </div>
                {/* Edit and Delete buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
                    onClick={() => editTransaction(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              <p>No transactions found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
