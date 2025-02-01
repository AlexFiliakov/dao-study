'use client';

import React from 'react';
import Navigation from './Navigation';
import { colors } from '@/constants/colors';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navigation />
      {children}
    </div>
  );
}