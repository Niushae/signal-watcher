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
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError('Watchlist name cannot be empty.');
      return;
    }

    const processedTerms = terms
      .split(',')
      .map((term) => term.trim())
      .filter(Boolean)
      .join(',');

    if (!processedTerms) {
      setFormError('Please provide at least one term.');
      return;
    }

    await onCreate(trimmedName, processedTerms);
    setName('');
    setTerms('');
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Create Watchlist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Name</label>
           <BaseInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Terms (comma-separated)</label>
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
          className="bg-blue-600 text-white hover:bg-blue-700 flex ml-auto"
        >
          Create Watchlist
        </BaseButton>
        {formError && <p className="text-red-500 mt-2">{formError}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </section>
  );
}