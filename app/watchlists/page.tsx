'use client';

import { useState, useEffect, useReducer } from 'react';
import WatchlistForm from '../components/WatchlistForm';
import WatchlistList from '../components/WatchlistList';

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

type State = {
  watchlists: Watchlist[];
  events: Event[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: 'SET_WATCHLISTS'; payload: Watchlist[] }
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: State = {
  watchlists: [],
  events: [],
  isLoading: false,
  error: null,
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_WATCHLISTS':
      return { ...state, watchlists: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function WatchlistPage() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { watchlists, isLoading, error } = state;

  const fetchWatchlists = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/watchlists`);
      const data = await response.json();
      dispatch({ type: 'SET_WATCHLISTS', payload: data });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: `Error fetching watchlists: ${err.message}` });
    }
  };

  const handleCreateWatchlist = async (name: string, terms: string) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await fetch(`${BACKEND_URL}/watchlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          terms: terms.split(',').map(term => term.trim()),
        }),
      });

      if (!response.ok) throw new Error('Failed to create watchlist.');
      await fetchWatchlists();
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const handleSimulateEvent = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      
      const response = await fetch(`${BACKEND_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) throw new Error('Failed to simulate event.');
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Watchlist Management</h1>
      <WatchlistForm onCreate={handleCreateWatchlist} error={error} />
      <WatchlistList watchlists={watchlists} onSimulate={handleSimulateEvent} isLoading={isLoading} />
    </main>
  );
}
