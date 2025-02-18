'use client';

import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { colors } from '@/constants/colors';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchLastCommitTime = async () => {
      try {
        const response = await fetch('/api/last-commit-time');
        const data = await response.json();
        const timestamp = data.timestamp;
        const date = new Date(parseInt(timestamp) * 1000);
        
        // Format date to EST
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        setLastUpdated(formatter.format(date));
      } catch (error) {
        console.error('Error fetching last commit time:', error);
        setLastUpdated('');
      }
    };

    fetchLastCommitTime();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      {lastUpdated && (
        <footer className="w-full py-4 text-center text-sm text-neutral-500">
          Website last updated {lastUpdated} EST
        </footer>
      )}
    </div>
  );
}