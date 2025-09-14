import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mb-2">
        AI Steam Game Curator
      </h1>
      <p className="text-lg text-gray-400">
        Your personal AI assistant for conquering your game backlog.
      </p>
    </header>
  );
};

export default Header;
