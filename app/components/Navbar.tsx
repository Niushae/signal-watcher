'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Watchlists', href: '/watchlists' },
    { name: 'Events', href: '/events'},
  ];

  const navLinkClasses = 'text-sm font-medium hover:text-white';

  return (
    <nav className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)]/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <svg
              className="h-8 w-8 text-[var(--primary)]"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
            <h1 className="text-xl font-bold">FinSight</h1>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${navLinkClasses} ${
                pathname === link.href ? 'text-white' : 'text-gray-200'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
