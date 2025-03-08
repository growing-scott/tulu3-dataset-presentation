'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Datasets', path: '/datasets' },
    { name: 'Prompt Curation', path: '/curation' },
    { name: 'Prompt Synthesis', path: '/synthesis' },
    { name: 'Decontamination', path: '/decontamination' },
    { name: 'Model Training', path: '/training' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <span className="text-2xl mr-2">🤖</span>
          </Link>
        </div>
        <ul className="flex flex-wrap justify-center space-x-1 md:space-x-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  pathname === item.path
                    ? 'bg-white text-indigo-800 font-medium'
                    : 'hover:bg-indigo-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 