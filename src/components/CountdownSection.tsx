import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Heart, Calendar } from 'lucide-react';

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [timeElapsed, setTimeElapsed] = useState<TimeUnit[]>([]);
  const [nextAnniversary, setNextAnniversary] = useState<TimeUnit[]>([]);

  const startDate = new Date('2023-10-06');
  const nextAnniversaryDate = new Date('2024-10-06');

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      
      // Time elapsed since we met
      const elapsedMs = now.getTime() - startDate.getTime();
      const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
      const elapsedHours = Math.floor((elapsedMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const elapsedMinutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
      const elapsedSeconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);

      setTimeElapsed([
        { value: elapsedDays, label: 'Days' },
        { value: elapsedHours, label: 'Hours' },
        { value: elapsedMinutes, label: 'Minutes' },
        { value: elapsedSeconds, label: 'Seconds' }
      ]);

      // Time until next anniversary
      const anniversaryMs = nextAnniversaryDate.getTime() - now.getTime();
      if (anniversaryMs > 0) {
        const days = Math.floor(anniversaryMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((anniversaryMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((anniversaryMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((anniversaryMs % (1000 * 60)) / 1000);

        setNextAnniversary([
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Minutes' },
          { value: seconds, label: 'Seconds' }
        ]);
      }
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-soft-pink dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 dark:text-white mb-4">
            Time Together
          </h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every second with you is precious, every moment a gift
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Time Elapsed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-rose-gold" />
                <h3 className="text-3xl font-playfair font-semibold text-gray-800 dark:text-white">
                  Time Since We Met
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-lato">
                October 6, 2023 - The day our story began
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {timeElapsed.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    className="bg-gradient-to-br from-rose-gold to-lilac text-white rounded-xl p-6 mb-3 shadow-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold font-playfair">
                      {unit.value.toLocaleString()}
                    </div>
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-300 font-lato font-medium">
                    {unit.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Next Anniversary Countdown */}
          {nextAnniversary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-sage" />
                  <h3 className="text-3xl font-playfair font-semibold text-gray-800 dark:text-white">
                    Until Our Next Anniversary
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-lato">
                  October 6, 2024 - One year of beautiful memories
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {nextAnniversary.map((unit, index) => (
                  <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <motion.div
                      className="bg-gradient-to-br from-sage to-beige text-white rounded-xl p-6 mb-3 shadow-lg"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold font-playfair">
                        {unit.value.toLocaleString()}
                      </div>
                    </motion.div>
                    <div className="text-gray-600 dark:text-gray-300 font-lato font-medium">
                      {unit.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;