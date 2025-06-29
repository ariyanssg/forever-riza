import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, ChevronLeft, ChevronRight, Heart, Star, Sparkles } from 'lucide-react';

interface LoveQuote {
  id: number;
  text: string;
  author: string;
  category: string;
}

const QuotesCarousel: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const quotes: LoveQuote[] = [
    {
      id: 1,
      text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
      author: "Lao Tzu",
      category: "Strength"
    },
    {
      id: 2,
      text: "The best thing to hold onto in life is each other.",
      author: "Audrey Hepburn",
      category: "Connection"
    },
    {
      id: 3,
      text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
      author: "Unknown",
      category: "Daily Love"
    },
    {
      id: 4,
      text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      author: "Maya Angelou",
      category: "Uniqueness"
    },
    {
      id: 5,
      text: "Love is composed of a single soul inhabiting two bodies.",
      author: "Aristotle",
      category: "Unity"
    },
    {
      id: 6,
      text: "I have found the one whom my soul loves.",
      author: "Song of Solomon 3:4",
      category: "Soulmate"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying && inView && !isHovered) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, inView, quotes.length, isHovered]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
    setIsAutoPlaying(false);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-soft-pink to-lilac dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-rose-gold/40" />
            ) : i % 3 === 1 ? (
              <Star className="w-3 h-3 text-sage/40" />
            ) : (
              <Sparkles className="w-3 h-3 text-lilac/40" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-dancing text-gray-800 dark:text-white mb-4"
            animate={{ 
              textShadow: [
                "0 0 0px rgba(232, 180, 184, 0)",
                "0 0 20px rgba(232, 180, 184, 0.5)",
                "0 0 0px rgba(232, 180, 184, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Words of Love
          </motion.h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beautiful quotes that capture the essence of our love
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-600/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(232, 180, 184, 0.3)"
            }}
          >
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-gold via-sage to-lilac"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />
            
            <Quote className="absolute top-6 left-6 w-8 h-8 text-rose-gold/30" />
            <Quote className="absolute bottom-6 right-6 w-6 h-6 text-rose-gold/20 rotate-180" />
            
            <div className="relative min-h-[250px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 90 }}
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="text-center"
                >
                  <motion.blockquote 
                    className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white leading-relaxed mb-8 italic relative"
                    animate={{ 
                      scale: isHovered ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="relative z-10">
                      "{quotes[currentQuote].text}"
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-gold/10 via-transparent to-sage/10 rounded-lg -z-10"
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.blockquote>
                  
                  <div className="space-y-3">
                    <motion.cite 
                      className="text-lg font-lato font-semibold text-rose-gold not-italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      — {quotes[currentQuote].author}
                    </motion.cite>
                    <motion.div 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-gold/20 to-sage/20 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Heart className="w-3 h-3 text-rose-gold" />
                      <span className="text-sm font-lato text-gray-600 dark:text-gray-300">
                        {quotes[currentQuote].category}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Navigation */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={prevQuote}
                className="group p-4 bg-gradient-to-r from-rose-gold/20 to-rose-gold/30 hover:from-rose-gold/30 hover:to-rose-gold/40 rounded-full transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-5 h-5 text-rose-gold group-hover:text-white transition-colors" />
              </motion.button>

              {/* Enhanced Dots Indicator */}
              <div className="flex space-x-3">
                {quotes.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentQuote(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`relative transition-all duration-300 ${
                      index === currentQuote
                        ? 'w-8 h-3'
                        : 'w-3 h-3 hover:w-4'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    aria-label={`Go to quote ${index + 1}`}
                  >
                    <div className={`w-full h-full rounded-full transition-all duration-300 ${
                      index === currentQuote
                        ? 'bg-gradient-to-r from-rose-gold to-sage'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-rose-gold/50'
                    }`} />
                    {index === currentQuote && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={nextQuote}
                className="group p-4 bg-gradient-to-r from-sage/20 to-sage/30 hover:from-sage/30 hover:to-sage/40 rounded-full transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next quote"
              >
                <ChevronRight className="w-5 h-5 text-sage group-hover:text-white transition-colors" />
              </motion.button>
            </div>

            {/* Enhanced Auto-play indicator */}
            <div className="text-center mt-6">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="group flex items-center gap-2 mx-auto px-4 py-2 text-sm font-lato text-gray-500 dark:text-gray-400 hover:text-rose-gold transition-colors rounded-full hover:bg-rose-gold/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'}`}
                  animate={isAutoPlaying ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {isAutoPlaying ? 'Auto-playing' : 'Paused'} • Click to {isAutoPlaying ? 'pause' : 'resume'}
              </motion.button>
            </div>

            {/* Progress Bar */}
            {isAutoPlaying && !isHovered && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-gold to-sage"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={currentQuote}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuotesCarousel;