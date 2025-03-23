import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="p-4 border-b border-gray-300 flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      {/* Placeholder for a profile/settings icon */}
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
    </header>
  );
};

export default Header;
