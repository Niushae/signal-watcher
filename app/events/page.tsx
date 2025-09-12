'use client';

import { useState, useEffect } from 'react';
import EventLog from '../components/EventLog';

type Event = {
  id: string;
  summary: string;
  severity: string;
  suggestedAction: string;
  createdAt: string;
  watchlistId: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/events`);
      const data = await response.json();
      console.log(data);
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Event Log</h1>
      <EventLog events={events} />
    </main>
  );
}