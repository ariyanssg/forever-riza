import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Heart, Star } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const TimelineSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const events: TimelineEvent[] = [
    {
      date: "October 6, 2023",
      title: "The Beginning",
      description: "The day our hearts first recognized each other. Every moment since has been a precious gift that continues to unfold.",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-rose-gold"
    },
    {
      date: "October 7, 2023",
      title: "Our First Adventure",
      description: "Hand in hand, we explored the world together. Your laughter became my favorite sound, echoing through every memory we've created.",
      icon: <Star className="w-5 h-5" />,
      color: "bg-lilac"
    },
    {
      date: "October 8, 2023",
      title: "Forever Promised",
      description: "Under the autumn sky, we promised each other forever. That sacred promise still holds true and grows stronger with each passing day.",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-sage"
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-white to-soft-pink dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 dark:text-white mb-4">
            Our Love Story Timeline
          </h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every date marks a milestone in our beautiful journey together, from our first meeting to our promises of forever
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-gold to-sage rounded-full opacity-30 dark:opacity-50"></div>

          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <article className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${event.color} p-2 rounded-full text-white`} aria-hidden="true">
                      {event.icon}
                    </div>
                    <time className="font-lato text-sm text-gray-600 dark:text-gray-400" dateTime={event.date}>
                      {event.date}
                    </time>
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="font-lato text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </article>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-rose-gold rounded-full shadow-lg" aria-hidden="true"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;