
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm py-2">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-primary text-white p-1 rounded font-bold">CW</span>
          <span className="font-bold text-lg">CryptoWave</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/news" className="nav-link">News</Link>
          <Link to="/research" className="nav-link">Research</Link>
          <Link to="/charts" className="nav-link">Charts</Link>
          <Link to="/sentiment" className="nav-link">Sentiment</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-border py-4 shadow-md animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
            <Link to="/news" className="nav-link" onClick={toggleMenu}>News</Link>
            <Link to="/research" className="nav-link" onClick={toggleMenu}>Research</Link>
            <Link to="/charts" className="nav-link" onClick={toggleMenu}>Charts</Link>
            <Link to="/sentiment" className="nav-link" onClick={toggleMenu}>Sentiment</Link>
            <Link to="/portfolio" className="nav-link" onClick={toggleMenu}>Portfolio</Link>
            <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
