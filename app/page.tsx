import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Signal Watcher</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your security watchlists and view the event log.
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/watchlists" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Manage Watchlists
        </Link>
        <Link href="/events" className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
          View Event Log
        </Link>
      </div>
    </main>
  );
}
