import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Sparkles } from 'lucide-react';

interface LoveNote {
  id: number;
  title: string;
  message: string;
  color: string;
  position: { x: number; y: number; rotation: number };
}

const LoveNotesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);
  const [showLetter, setShowLetter] = useState(false);

  const loveNotes: LoveNote[] = [
    {
      id: 1,
      title: "Your Smile",
      message: "Your smile is the first thing I think of when I wake up and the last thing I see before I sleep. It's my sunshine on cloudy days and my reminder that everything will be okay.",
      color: "bg-rose-gold",
      position: { x: 20, y: 30, rotation: -15 }
    },
    {
      id: 2,
      title: "Your Kindness",
      message: "The way you care for others, the gentle way you speak, the love you show to everyone around you - it makes me fall in love with you more every single day.",
      color: "bg-lilac",
      position: { x: 70, y: 20, rotation: 12 }
    },
    {
      id: 3,
      title: "Your Strength",
      message: "You face every challenge with grace and courage. Your resilience inspires me to be better, to love deeper, and to believe in us more every day.",
      color: "bg-sage",
      position: { x: 15, y: 70, rotation: 8 }
    },
    {
      id: 4,
      title: "Your Love",
      message: "The way you love me - completely, unconditionally, with your whole heart - has changed my life. You've shown me what it means to be truly loved and to love in return.",
      color: "bg-soft-pink",
      position: { x: 65, y: 65, rotation: -8 }
    }
  ];

  const loveLetterContent = `My Dearest Riza,

Words feel inadequate when I try to express how much you mean to me. You are my morning coffee and my evening tea, my adventure companion and my peaceful harbor, my laughter and my tears of joy.

I love the way you scrunch your nose when you're concentrating, how you dance when you think no one is watching, and how you make every ordinary moment feel extraordinary just by being you.

You've taught me that love isn't just a feeling - it's a choice we make every day, and I choose you, today and always.

Thank you for being you, for loving me, for making every day brighter just by existing in my world.

Forever yours,
With all my love ❤️`;

  return (
    <section className="py-20 bg-gradient-to-b from-beige to-soft-pink dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-gold opacity-20 dark:opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0 
            }}
            animate={{
              y: -50,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 dark:text-white mb-4">
            What I Love About You
          </h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Click each petal to discover a piece of my heart
          </p>
          
          <motion.button
            onClick={() => setShowLetter(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-rose-gold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={20} />
            <span className="font-lato">Read My Love Letter</span>
          </motion.button>
        </motion.div>

        {/* Petal Grid */}
        <div className="relative h-96 max-w-4xl mx-auto">
          {loveNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="absolute cursor-pointer"
              style={{
                left: `${note.position.x}%`,
                top: `${note.position.y}%`,
                transform: `translate(-50%, -50%) rotate(${note.position.rotation}deg)`,
              }}
              onClick={() => setSelectedNote(note)}
              whileHover={{ scale: 1.1, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`${note.color} w-24 h-24 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300`}>
                <Heart size={24} />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <span className="font-lato text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {note.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Love Note Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className={`${selectedNote.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white`}>
                  <Heart size={24} />
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white">
                  {selectedNote.title}
                </h3>
              </div>
              <p className="font-lato text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                {selectedNote.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Letter Modal */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLetter(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full shadow-2xl max-h-96 overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-3xl font-dancing text-gray-800 dark:text-white mb-4">
                  A Letter Just For You
                </h3>
              </div>
              <div className="font-lato text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {loveLetterContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoveNotesSection;