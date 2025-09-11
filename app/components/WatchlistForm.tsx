// components/WatchlistForm.tsx
'use client';

import { useState } from 'react';
import BaseInput from './BaseInput';
import BaseButton from './BaseButton'; 

type Props = {
  onCreate: (name: string, terms: string) => Promise<void>;
  error: string | null;
};

export default function WatchlistForm({ onCreate, error }: Props) {
  const [name, setName] = useState('');
  const [terms, setTerms] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreate(name, terms);
    setName('');
    setTerms('');
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Create Watchlist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
           <BaseInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Terms (comma-separated)</label>
         <BaseInput
            type="text"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            required
          />
        </div>
        <BaseButton
          type="submit"
          color='bg-blue-600'
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Watchlist
        </BaseButton>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </section>
  );
}