'use client';

import { Bot, ListChecks } from 'lucide-react';
import { useToast } from '../context/ToastContext';

type Watchlist = {
  id: string;
  name: string;
  terms: string[];
};

type Props = {
  watchlists: Watchlist[];
  onSimulate: (id: string) => Promise<void>;
  isLoading: boolean; 
};

export default function WatchlistList({ watchlists, onSimulate, isLoading }: Props) {
  const { addToast } = useToast();
  const handleSimulateClick = async (id: string) => {
    await onSimulate(id);
    addToast('Event successfully simulated!', 'success');
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Your Watchlists</h2>
      {watchlists.length === 0 ? (
        <p className="text-gray-400">No watchlists found. Create one above.</p>
      ) : (
        <div className="space-y-6">
          {watchlists.map(list => (
            <div
              key={list.id}
              className="rounded-md border border-gray-700 bg-gray-800/50 p-6 transition-all hover:border-primary hover:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-700 ">
                  <span className="text-2xl text-primary">
                    <ListChecks />
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{list.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Terms: {list.terms.join(', ')}
                  </p>
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <h4 className="text-sm font-semibold text-gray-300">
                      Actions:
                    </h4>
                    <button
                      onClick={() => handleSimulateClick(list.id)}
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 bg-blue-600 cursor-pointer"
                      disabled={isLoading}
                    >
                      <Bot className="h-4 w-4" />
                      {isLoading ? 'Simulating...' : 'Simulate Event'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}