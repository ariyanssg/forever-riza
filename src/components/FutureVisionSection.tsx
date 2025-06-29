import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Home, Plane, Baby, Mountain } from 'lucide-react';

interface FutureScenario {
  id: number;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  color: string;
  bgImage: string;
}

const FutureVisionSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedScenario, setSelectedScenario] = useState<FutureScenario | null>(null);

  const scenarios: FutureScenario[] = [
    {
      id: 1,
      title: "Our Home Together",
      description: "A cozy place filled with laughter, love, and the aroma of home-cooked meals.",
      details: "Picture this: Sunday mornings with coffee in bed, a garden where we grow our own flowers, and a kitchen where we dance while cooking together. Every room would echo with our laughter, every corner would hold our memories.",
      icon: <Home size={32} />,
      color: "bg-rose-gold",
      bgImage: "/image.png"
    },
    {
      id: 2,
      title: "Adventures Around the World",
      description: "Exploring new cultures, tasting exotic foods, and creating memories across continents.",
      details: "From the romantic streets of Paris to the serene beaches of Bali, from the northern lights in Iceland to the cherry blossoms in Japan. Every destination would be an adventure, every journey a new chapter in our story.",
      icon: <Plane size={32} />,
      color: "bg-sage",
      bgImage: "/image copy copy.png"
    },
    {
      id: 3,
      title: "Growing Our Family",
      description: "Little hands to hold, bedtime stories to tell, and love that multiplies infinitely.",
      details: "Imagine teaching them to ride bikes, attending school plays, and watching them discover the world with wonder. Our love would create new love, and our family would be the greatest adventure of all.",
      icon: <Baby size={32} />,
      color: "bg-lilac",
      bgImage: "/image copy.png"
    },
    {
      id: 4,
      title: "Growing Old Together",
      description: "Silver hair, wrinkled hands intertwined, and a love that has weathered every storm.",
      details: "Sitting on our porch, watching sunsets we've seen a thousand times but never tire of. Sharing stories our grandchildren have heard before but love to hear again. Still finding new things to love about each other.",
      icon: <Mountain size={32} />,
      color: "bg-soft-pink",
      bgImage: "https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-lilac dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 dark:text-white mb-4">
            Our Future Together
          </h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Click each dream to see our future unfold
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedScenario(scenario)}
            >
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <img
                  src={scenario.bgImage}
                  alt={scenario.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className={`${scenario.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {scenario.icon}
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold text-white mb-2">
                    {scenario.title}
                  </h3>
                  <p className="font-lato text-white/90 text-sm">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scenario Details Modal */}
      <AnimatePresence>
        {selectedScenario && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScenario(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={selectedScenario.bgImage}
                  alt={selectedScenario.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-4">
                  <div className={`${selectedScenario.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                    {selectedScenario.icon}
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold text-white">
                    {selectedScenario.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="font-lato text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedScenario.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FutureVisionSection;