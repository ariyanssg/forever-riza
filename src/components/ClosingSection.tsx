import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Heart, Share2 } from 'lucide-react';

const ClosingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Forever Riza - Our Love Story',
          text: 'A beautiful love story created with all my heart',
          url: window.location.href,
        });
      } catch (error) {
        // Handle user cancellation or permission denied gracefully
        // Fall back to clipboard copy
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        } catch (clipboardError) {
          // If clipboard also fails, show a message
          alert('Unable to share. Please copy the URL manually.');
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        alert('Unable to copy link. Please copy the URL manually.');
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-lilac via-soft-pink to-beige dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20 dark:opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { 
              opacity: 0.2, 
              scale: 1,
              rotate: [0, 360],
              y: [0, -20, 0]
            } : {}}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-dancing text-gray-800 dark:text-white mb-8">
            This is Our Beginning
          </h2>
          
          <motion.p
            className="text-xl md:text-2xl font-playfair text-gray-700 dark:text-gray-300 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Every love story is beautiful, but ours is my favorite. 
            Thank you for being my partner, my best friend, my everything. 
            Here's to all the chapters we've yet to write together.
          </motion.p>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-3 px-8 py-4 bg-rose-gold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-lato text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} />
                Watch Our Video Message
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-rose-gold text-rose-gold dark:text-rose-gold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-lato text-lg hover:bg-rose-gold hover:text-white dark:hover:bg-rose-gold dark:hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={24} />
                Share Our Story
              </motion.button>
            </div>

            <motion.div
              className="mt-16 p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Heart className="mx-auto text-rose-gold mb-4" size={48} />
              <p className="font-dancing text-3xl md:text-4xl text-gray-800 dark:text-white mb-4">
                Will you forgive me?
              </p>
              <p className="font-playfair text-lg text-gray-700 dark:text-gray-300">
                Will you give us another chance to make beautiful memories together?
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="mx-auto text-rose-gold mb-4" size={64} />
              <h3 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white mb-4">
                A Message From My Heart
              </h3>
              <p className="font-lato text-gray-600 dark:text-gray-300 mb-6">
                "Riza, if you're reading this, know that every word on this page comes from the deepest part of my heart. You are my sunshine, my anchor, my home. I love you more than words can express, and I promise to spend every day showing you just how much you mean to me."
              </p>
              <p className="font-dancing text-xl text-rose-gold">
                Forever yours ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClosingSection;