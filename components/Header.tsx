
import React from 'react';
import type { FC } from 'react';

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full max-w-3xl text-center py-4 md:py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500">
        {title}
      </h1>
    </header>
  );
};
    