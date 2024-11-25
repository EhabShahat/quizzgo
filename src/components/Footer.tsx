import React from 'react';
import { Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-white/70 text-sm py-3 bg-black/30 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-xs sm:text-sm">Made w/ ♥️, st. Mina and po. Cyril</span>
        <div className="flex items-center gap-2">
          <a
            href="https://m.facebook.com/profile.php?id=100075640227938"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;