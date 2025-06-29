import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Moon, Star, Heart } from 'lucide-react';

const ApologySection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showHandwriting, setShowHandwriting] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShowHandwriting(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const apologyText = `I'm sorry, my love. I know I've made mistakes, and I know that words alone cannot undo the hurt I've caused. But please know that every beat of my heart carries regret for the pain I've brought to yours.

You deserve all the love, respect, and kindness in the world. You deserve someone who cherishes every moment with you, who never takes your beautiful heart for granted.

I promise to do better, to be better, to love you the way you deserve to be loved - completely, honestly, and with all of me.

Will you give us another chance to write our story together?`;

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
      {/* Moonlit Background */}
      <div className="absolute inset-0">
        {/* Moon */}
        <motion.div
          className="absolute top-16 right-16 w-32 h-32 bg-yellow-100 dark:bg-yellow-200 rounded-full shadow-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.8, scale: 1 } : {}}
          transition={{ duration: 2 }}
        >
          <Moon className="absolute inset-0 m-auto text-yellow-200 dark:text-yellow-300" size={64} />
        </motion.div>

        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white dark:text-gray-200 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: Math.random() * 0.8 + 0.2 } : {}}
            transition={{ duration: 1, delay: Math.random() * 2 }}
          >
            <Star size={Math.random() * 8 + 4} />
          </motion.div>
        ))}

        {/* Garden Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-white mb-4">
            From My Heart to Yours
          </h2>
          <p className="text-xl font-playfair text-white/80 max-w-2xl mx-auto">
            Under the moonlight, I bare my soul to you
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-600/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-center mb-8">
              <Heart className="mx-auto text-red-400 mb-4" size={48} />
            </div>

            <motion.div
              className="font-playfair text-white text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={showHandwriting ? { opacity: 1 } : {}}
              transition={{ duration: 2 }}
            >
              {apologyText.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="mb-6 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={showHandwriting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: index * 0.5 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={showHandwriting ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 3 }}
            >
              <p className="font-dancing text-3xl text-white/90 mb-4">
                Forever yours,
              </p>
              <p className="font-dancing text-2xl text-white/80">
                With all my love ❤️
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApologySection;