import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Search, Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--background)', 
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)',
        opacity: '0.95'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="p-2 rounded-xl shadow-lg"
                   style={{ backgroundColor: 'var(--primary)' }}>
                <Sparkles className="w-6 h-6" style={{ color: 'var(--primary-foreground)' }} />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight"
                  style={{ 
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-sans)'
                  }}>
                Pixfind
              </h1>
              <p className="text-xs opacity-70" style={{ color: 'var(--muted-foreground)' }}>
                AI-Powered Visual Search
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#search"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all"
              style={{ color: 'var(--muted-foreground)' }}
              whileHover={{ 
                scale: 1.05,
                color: 'var(--foreground)'
              }}
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">Search</span>
            </motion.a>

            <motion.a
              href="#about"
              className="px-4 py-2 rounded-lg transition-all font-medium"
              style={{ color: 'var(--muted-foreground)' }}
              whileHover={{ 
                scale: 1.05,
                color: 'var(--foreground)'
              }}
            >
              About
            </motion.a>

            <motion.a
              href="#contact"
              className="px-4 py-2 rounded-lg transition-all font-medium"
              style={{ color: 'var(--muted-foreground)' }}
              whileHover={{ 
                scale: 1.05,
                color: 'var(--foreground)'
              }}
            >
              Contact
            </motion.a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-xl shadow-lg transition-all relative overflow-hidden"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                ) : (
                  <Sun className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                )}
              </motion.div>
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0"
                style={{ backgroundColor: 'var(--accent)' }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl shadow-lg"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                ) : (
                  <Menu className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <motion.a
              href="#search"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all"
              style={{ color: 'var(--muted-foreground)' }}
              whileHover={{ backgroundColor: 'var(--muted)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search</span>
            </motion.a>

            <motion.a
              href="#about"
              className="block px-4 py-3 rounded-lg transition-all font-medium"
              style={{ color: 'var(--muted-foreground)' }}
              whileHover={{ backgroundColor: 'var(--muted)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </motion.a>

            <motion.a
              href="#contact"
              className="block px-4 py-3 rounded-lg transition-all font-medium"
              style={{ color: 'var(--muted-foreground)' }}
              whileHover={{ backgroundColor: 'var(--muted)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}