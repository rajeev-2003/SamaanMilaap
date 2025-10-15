import React from "react";
import { motion } from "framer-motion";
import { Filter, Sliders } from "lucide-react";

export default function FilterPanel({ filters, setFilters, onApply }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-5xl mx-auto mb-10"
    >
      <div className="rounded-3xl p-8 shadow-xl border-2 backdrop-blur-sm" style={{ 
        backgroundColor: 'var(--card)', 
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-2xl shadow-lg" 
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <Filter className="w-6 h-6" style={{ color: 'var(--primary-foreground)' }} />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Smart Filters</h2>
            <p className="text-sm opacity-70" style={{ color: 'var(--muted-foreground)' }}>
              Refine your search results
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Gender Filter */}
          <div className="space-y-3">
            <label className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
              Gender
            </label>
            <div className="relative group">
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className="w-full rounded-2xl px-5 py-4 transition-all duration-300 focus:outline-none focus:ring-3 border-2 appearance-none cursor-pointer group-hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--input)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <option value="">All Genders</option>
                <option value="Men">👨 Men</option>
                <option value="Women">👩 Women</option>
                <option value="Unisex">👫 Unisex</option>
              </select>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                   style={{ backgroundColor: 'var(--primary)' }} />
            </div>
          </div>

          {/* Base Colour Filter */}
          <div className="space-y-3">
            <label className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
              Color
            </label>
            <div className="relative group">
              <select
                value={filters.baseColour}
                onChange={(e) => setFilters({ ...filters, baseColour: e.target.value })}
                className="w-full rounded-2xl px-5 py-4 transition-all duration-300 focus:outline-none focus:ring-3 border-2 appearance-none cursor-pointer group-hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--input)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <option value="">All Colors</option>
                <option value="Black">⚫ Black</option>
                <option value="White">⚪ White</option>
                <option value="Blue">🔵 Blue</option>
                <option value="Red">🔴 Red</option>
                <option value="Green">🟢 Green</option>
                <option value="Grey">⚫ Grey</option>
                <option value="Navy Blue">🔵 Navy Blue</option>
                <option value="Orange">🟠 Orange</option>
                <option value="Purple">🟣 Purple</option>
              </select>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                   style={{ backgroundColor: 'var(--primary)' }} />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
              Category
            </label>
            <div className="relative group">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full rounded-2xl px-5 py-4 transition-all duration-300 focus:outline-none focus:ring-3 border-2 appearance-none cursor-pointer group-hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--input)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <option value="">All Categories</option>
                <option value="Apparel">👕 Apparel</option>
                <option value="Accessories">👜 Accessories</option>
                <option value="Footwear">👟 Footwear</option>
                <option value="Sporting Goods">⚽ Sports</option>
              </select>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                   style={{ backgroundColor: 'var(--primary)' }} />
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex flex-col justify-end">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApply}
              className="w-full px-6 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 relative overflow-hidden group"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)'
              }}
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sliders className="w-5 h-5" />
              </motion.div>
              <span>Apply Filters</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                   style={{ backgroundColor: 'var(--accent)' }} />
            </motion.button>
          </div>
        </div>

        {/* Similarity Slider */}
        <div className="space-y-5 p-6 rounded-2xl border-2" style={{ 
          backgroundColor: 'var(--muted)', 
          borderColor: 'var(--border)' 
        }}>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold flex items-center gap-3 uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sliders className="w-5 h-5" />
              </motion.div>
              Minimum Similarity
            </label>
            <motion.span 
              key={filters.similarity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold px-4 py-2 rounded-xl shadow-lg" 
              style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--card)'
              }}
            >
              {filters.similarity}%
            </motion.span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={filters.similarity}
              onChange={(e) => setFilters({ ...filters, similarity: Number(e.target.value) })}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-enhanced"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--accent) ${filters.similarity}%, var(--muted) ${filters.similarity}%, var(--border) 100%)`
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}></span>
              0% - Show All
            </span>
            <span className="flex items-center gap-2">
              100% - Exact Match
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
