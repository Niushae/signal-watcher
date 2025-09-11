'use client';

type Event = {
  id: string;
  text: string;
  summary: string;
  severity: string;
  suggestedAction: string;
  createdAt: string;
};

type Props = {
  events: Event[];
};

export default function EventLog({ events }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Event Log</h2>
      {events.length === 0 ? (
        <p className="text-gray-400">No events to display. Simulate an event from a watchlist.</p>
      ) : (
        events.map(event => (
          <div key={event.id} className="p-4 border rounded-lg shadow-sm mb-4">
            <p className="font-semibold">{event.summary}</p>
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
    </section>
  );
}