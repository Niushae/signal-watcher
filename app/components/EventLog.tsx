"use client";

import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

type Event = {
  id: string;
  summary: string;
  severity: string;
  suggestedAction: string;
  createdAt: string;
  watchlistId: string;
};

type Watchlist = {
  id: string;
  name: string;
  terms: string[];
};

type Status = "Critical" | "High" | "Medium" | "Low";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const statusStyles: Record<Status, { classes: string; icon: any }> = {
  Critical: {
    classes: "bg-red-900/50 text-red-300",
    icon: "siren",
  },
  High: {
    classes: "bg-yellow-900/50 text-yellow-300",
    icon: "triangle-alert",
  },
  Medium: {
    classes: "bg-orange-900/50 text-orange-300",
    icon: "fingerprint",
  },
  Low: {
    classes: "bg-green-900/50 text-green-300",
    icon: "info",
  },
};

type Props = {
  events: Event[];
};

export default function EventLog({ events }: Props) {
  const [watchlists, setWatchlists] = useState<Record<string, Watchlist>>({});

  useEffect(() => {
    const fetchWatchlistForEvent = async (id: string) => {
      if (watchlists[id]) return;
      try {
        const response = await fetch(`${BACKEND_URL}/watchlists/${id}`);
        const data: Watchlist = await response.json();
        setWatchlists((prev) => ({ ...prev, [id]: data }));
      } catch (err) {
        console.error(`Failed to fetch watchlist ${id}:`, err);
      }
    };

    events.forEach((event) => {
      fetchWatchlistForEvent(event.watchlistId);
    });
  }, [events, watchlists]);

  return (
    <section>
      {events.length === 0 ? (
        <p className="text-gray-400">
          No events to display. Simulate an event from a watchlist.
        </p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => {
            const status = (event.severity.charAt(0).toUpperCase() +
              event.severity.slice(1).toLowerCase()) as Status;
            const watchlist = watchlists[event.watchlistId];
            const currentStatus = statusStyles[status];

            return (
              <div
                key={event.id}
                className="rounded-md border border-gray-700 bg-gray-800/50 p-6 transition-all hover:border-primary hover:bg-gray-800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-700 ">
                    <span className="material-symbols-outlined text-2xl text-primary">
                      <Building2 />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {watchlist?.name || 'Loading...'}
                        </h3>
                        <p className="text-xs text-gray-400">
                          From Watchlist: {watchlist?.name || '...'}
                        </p>
                      </div>
                      {currentStatus && (
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium ${currentStatus.classes}`}
                        >
                          <span className="mr-1.5 text-base">
                            <DynamicIcon name={currentStatus.icon}/>
                          </span>
                          {status}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      {event.summary}
                    </p>
                    <div className="mt-4 border-t border-gray-700 pt-4">
                      <h4 className="text-sm font-semibold text-gray-300">
                        Suggested Actions:
                      </h4>
                      <p className="mt-1 text-sm text-gray-400">
                        {event.suggestedAction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
