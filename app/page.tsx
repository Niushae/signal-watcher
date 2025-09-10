'use client';
import { useEffect, useState } from 'react';

type Watchlist = {
  id: string;
  name: string;
  terms: string[];
};

type Event = {
  id: string;
  text: string;
  summary: string;
  severity: string;
  suggestedAction: string;
  createdAt: string; 
};

const DUMMY_EVENT_TEXT = "Un nuevo dominio fraudulento 'secure-bank-login.net' fue registrado, simulando ser la marca 'Banco Global'.";
const BACKEND_URL = 'http://localhost:3000/api';

export default function HomePage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [newWatchlistTerms, setNewWatchlistTerms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const fetchWatchlists = async () => {
    const response = await fetch(`${BACKEND_URL}/watchlists`);
    const data = await response.json();
    setWatchlists(data);
  };  

    const fetchEvents = async () => {
    const response = await fetch(`${BACKEND_URL}/events`);
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchWatchlists();
    fetchEvents();
  }, []);

  // --- Event Handlers ---
  const handleCreateWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/watchlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newWatchlistName,
          terms: newWatchlistTerms.split(',').map(term => term.trim()),
        }),
      });

      if (!response.ok) throw new Error('Failed to create watchlist.');

      await fetchWatchlists(); 
      setNewWatchlistName('');
      setNewWatchlistTerms('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSimulateEvent = async (watchlistTerms: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
  const randomTerm = watchlistTerms[Math.floor(Math.random() * watchlistTerms.length)];

      const response = await fetch(`${BACKEND_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: DUMMY_EVENT_TEXT }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchEvents();

    } catch (err: any) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Signal Watcher Frontend</h1>
      <p className="text-gray-600 mb-6">
        Click the button to send a request to your backend to simulate a suspicious event and receive an AI-enriched response.
      </p>

    <section className="mb-10">
      <form onSubmit={handleCreateWatchlist} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Terms (comma-separated)</label>
            <input
              type="text"
              value={newWatchlistTerms}
              onChange={(e) => setNewWatchlistTerms(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Watchlist
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  onClick={() => handleSimulateEvent(list.terms)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Simulating...' : 'Simulate Event'}
                </button>
              </div>
            ))
          )}
        </section>
      </div>

      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Event Log</h2>
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-400">No events to display yet. Click the button above.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-4 border rounded-lg shadow-sm">
              <p className="font-semibold text-lg">{event.summary}</p>
              <p className="text-sm mt-1">
                <strong>Severity:</strong>{' '}
                <span className={event.severity === 'HIGH' ? 'text-red-600 font-bold' : 'text-yellow-600 font-bold'}>
                  {event.severity}
                </span>
              </p>
              <p className="text-sm">
                <strong>Suggested Action:</strong> {event.suggestedAction}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                ID: {event.id} | Created At: {new Date(event.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
