'use client';

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
  const handleSimulateClick = async (id: string) => {
    await onSimulate(id);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Your Watchlists</h2>
      {watchlists.length === 0 ? (
        <p className="text-gray-400">No watchlists found. Create one above.</p>
      ) : (
        watchlists.map(list => (
          <div key={list.id} className="p-4 border rounded-lg shadow-sm mb-4">
            <h3 className="text-xl font-bold">{list.name}</h3>
            <p className="text-sm text-gray-600">Terms: {list.terms.join(', ')}</p>
            <button
              onClick={() => handleSimulateClick(list.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Simulating...' : 'Simulate Event'}
            </button>
          </div>
        ))
      )}
    </section>
  );
}