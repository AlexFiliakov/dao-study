'use client';

import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { colors } from '@/constants/colors';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchLastCommitTime = async () => {
      try {
        const response = await fetch('/commit-time.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.timestamp) {
          throw new Error('No timestamp in commit-time.json');
        }
        
        const date = new Date(parseInt(data.timestamp) * 1000);
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
        console.error('Error fetching commit time:', error);
        setLastUpdated('');
      }
    };

    fetchLastCommitTime();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navigation />
      <main className="flex-grow mt-12">
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