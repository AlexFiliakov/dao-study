'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { colors } from '@/constants/colors';
import Link from 'next/link';
import Image from 'next/image';

export const menuItems = [
  { name: 'Home', path: '/' },
  { 
    name: 'Dao De Jing', 
    subItems: [
      { name: 'Translation and Notes', path: '/ddj_index' },
      { name: 'Recurring Themes', path: '/ddj_themes' },
      { name: 'Version Comparison', path: '/ddj_cn_compare' },
      { name: 'Character Relationships', path: '/ddj_grid' },
    ]
  },
  { 
    name: 'Yi Jing', 
    subItems: [
      { name: 'Hexagram Matrix', path: '/ic_grid' },
      { name: 'Hexagram Generator', path: '/ic_gen' },
      { name: 'Approached Guas', path: '/ic_approached' },
      { name: 'Mutual Guas', path: '/ic_mutual_guas' },
    ]
  },
  { name: 'Recommended Reading', path: '/reading_list' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 px-6 py-4 z-[99998] bg-white/75 border-b-1 border-gray-500/50 shadow-lg">
      <div className="flex justify-between items-center w-full">
        <div className="w-fit">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
            style={{ color: colors.tealPrimary }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="font-medium">Menu</span>
          </button>
        </div>
        <Link href="/">
          <Image
            src="/images/yin_yang_sign.png"
            alt="Yin Yang Logo"
            height={50}
            width={50} // Set width to 50 to maintain aspect ratio
            style={{ objectFit: 'cover', height: 'auto' }} // Set height to auto
            priority
          />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-fit min-w-[200px] bg-white shadow-lg rounded-lg z-[99999]">
          <div className="p-4">
            {menuItems.map((item, index) => (
              <div key={index} className="py-2 whitespace-nowrap">
                {item.path ? (
                  item.path.startsWith('http') ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:opacity-80"
                      style={{ color: colors.tealPrimary }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      className="cursor-pointer hover:opacity-80"
                      style={{ color: colors.tealPrimary }}
                      // onClick={() => setIsMenuOpen(false)} // Close menu after navigation
                    >
                      {item.name}
                    </Link>
                  )
                ) : (
                  <div 
                    className="cursor-pointer hover:opacity-80"
                    style={{ color: colors.tealPrimary }}
                  >
                    {item.name}
                  </div>
                )}
                {item.subItems && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <div 
                        key={subIndex}
                        className="whitespace-nowrap"
                      >
                        {subItem.path.startsWith('http') ? (
                          <a
                            href={subItem.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer hover:opacity-80"
                            style={{ color: colors.redAccent }}
                          >
                            {subItem.name}
                          </a>
                        ) : (
                          <Link
                            href={subItem.path}
                            className="cursor-pointer hover:opacity-80"
                            style={{ color: colors.redAccent }}
                            // onClick={() => setIsMenuOpen(false)} // Close menu after navigation
                          >
                            {subItem.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}