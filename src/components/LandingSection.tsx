import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Music, Volume2, VolumeX } from 'lucide-react';

const LandingSection: React.FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('timeline');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-soft-pink via-lilac to-beige dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-gold/30 dark:bg-rose-gold/20 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-sage/40 dark:bg-sage/30 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-lilac/35 dark:bg-lilac/25 rounded-full opacity-25 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="space-y-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-dancing text-gray-800 dark:text-white mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Hi Riza 🌸
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl font-playfair text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Welcome to our story, my love. Every scroll reveals another chapter of us, filled with memories, dreams, and endless love.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <button
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-gray-800 dark:text-white border border-white/20 dark:border-gray-600/20"
              aria-label={isMusicPlaying ? "Pause our song" : "Play our song"}
            >
              {isMusicPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="font-lato text-sm">Our Song</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            onClick={scrollToNext}
            role="button"
            aria-label="Scroll to timeline section"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-gray-600 dark:text-gray-300 font-lato text-sm">Scroll to explore our journey</span>
              <ChevronDown className="text-gray-600 dark:text-gray-300" size={24} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LandingSection;