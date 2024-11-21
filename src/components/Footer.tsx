import React from 'react';
import { Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-screen text-center text-white/70 text-sm py-4 bg-black/20 flex items-center justify-center gap-4">
      <span>Made w/ ♥️, st. Mina and po. Cyril</span>
      <div className="flex items-center gap-2">
        <a
          href="https://m.facebook.com/profile.php?id=100075640227938"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Facebook size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;