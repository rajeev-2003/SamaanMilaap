import React from "react";
import { motion } from "framer-motion";
import { getResponsiveCloudinaryUrl } from "../utils/cloudinary";
import { Star, Heart, ExternalLink } from "lucide-react";

export default function ResultCard({ product }) {
  const optimizedImageUrl = getResponsiveCloudinaryUrl(product.imageUrl, 400, 400);
  const similarityPercentage = Math.round((product.similarity || 0) * 100);
  
  const getSimilarityColor = (percentage) => {
    if (percentage >= 80) return "from-green-500 to-emerald-500";
    if (percentage >= 60) return "from-blue-500 to-cyan-500";
    if (percentage >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getSimilarityText = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    if (percentage >= 40) return "Fair Match";
    return "Basic Match";
  };
  
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border-2"
      style={{ 
        backgroundColor: 'var(--card)', 
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-xl)'
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={optimizedImageUrl}
          alt={product.productDisplayName || product.name}
          className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundColor: 'var(--muted)' }}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.2, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 backdrop-blur-md rounded-2xl shadow-xl transition-all"
            style={{ 
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)'
            }}
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, rotate: -12 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 backdrop-blur-md rounded-2xl shadow-xl transition-all"
            style={{ 
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)'
            }}
          >
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Enhanced Similarity Badge */}
        {product.similarity !== undefined && (
          <div className="absolute top-4 left-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="px-4 py-2 backdrop-blur-md rounded-2xl shadow-xl border-2"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--accent)',
                color: 'var(--foreground)'
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-4 h-4 fill-current" style={{ color: 'var(--accent)' }} />
                </motion.div>
                <span className="font-bold text-sm">{similarityPercentage}%</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Enhanced Content */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:opacity-90 transition-colors"
            style={{ color: 'var(--foreground)' }}>
          {product.productDisplayName || product.name}
        </h3>
        
        {/* Enhanced Product Details */}
        <div className="flex flex-wrap gap-2 text-sm">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-xl font-semibold border-2 transition-all"
            style={{ 
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              borderColor: 'var(--border)'
            }}>
            {product.gender}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-xl font-semibold border-2 transition-all"
            style={{ 
              backgroundColor: 'var(--muted)',
              color: 'var(--muted-foreground)',
              borderColor: 'var(--border)'
            }}>
            {product.baseColour}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-xl font-semibold border-2 transition-all"
            style={{ 
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
              borderColor: 'var(--border)'
            }}>
            {product.masterCategory}
          </motion.span>
        </div>

        {/* Enhanced Similarity Score */}
        {product.similarity !== undefined && (
          <div className="space-y-3 p-4 rounded-2xl border-2" style={{ 
            backgroundColor: 'var(--muted)',
            borderColor: 'var(--border)'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                <Star className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                AI Match Score
              </span>
              <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                {similarityPercentage}%
              </span>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative h-3 rounded-full overflow-hidden border-2" style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${similarityPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${getSimilarityColor(similarityPercentage)} rounded-full relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>
            
            {/* Match Quality Text */}
            <div className="text-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`font-bold text-sm px-3 py-1 rounded-full ${
                  similarityPercentage >= 80 ? 'text-green-400' : 
                  similarityPercentage >= 60 ? 'text-blue-400' : 
                  similarityPercentage >= 40 ? 'text-yellow-400' : 'text-red-400'
                }`}
                style={{ backgroundColor: 'var(--card)' }}
              >
                {getSimilarityText(similarityPercentage)}
              </motion.span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-30"
           style={{ 
             background: `radial-gradient(circle at center, var(--primary), transparent 70%)`
           }} />
    </motion.div>
  );
}
