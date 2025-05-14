
import React from 'react';
import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="w-full max-w-3xl text-center py-4 mt-8">
      <p className="text-sm text-slate-500">
        빛의 세기 시뮬레이터 &copy; {new Date().getFullYear()}. 
        <a href="https://github.com/google/labs-prototypes" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
          Google Labs 프로토타입
        </a>
      </p>
    </footer>
  );
};
    