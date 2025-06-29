import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Heart, Star, MapPin, Camera, Music, Clock, Thermometer, Smile, ChevronDown, ChevronUp, Maximize2, Play, Pause } from 'lucide-react';
import { useGesture } from 'react-use-gesture';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
  audio?: string;
  location?: string;
  weather?: string;
  mood?: string;
  tags?: string[];
  memories?: string[];
}

const InteractiveTimeline: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: "October 6, 2023",
      title: "First Meeting",
      description: "The universe conspired to bring us together on this magical day. Every star aligned perfectly, and time seemed to pause when our eyes first met.",
      icon: <Heart className="w-4 h-4" />,
      color: "from-rose-400 to-pink-500",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      location: "Central Coffee Shop",
      weather: "Sunny, 72°F",
      mood: "Nervous excitement",
      tags: ["first-date", "coffee", "destiny"],
      memories: ["Your shy smile", "Spilled coffee", "Endless conversation"]
    },
    {
      id: 2,
      date: "October 7, 2023",
      title: "First Walk",
      description: "Hand in hand through the park, discovering that our steps naturally matched our heartbeats. The autumn leaves danced around us like confetti.",
      icon: <MapPin className="w-4 h-4" />,
      color: "from-green-400 to-emerald-500",
      image: "https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&w=400",
      location: "Riverside Park",
      weather: "Clear, 68°F",
      mood: "Pure joy",
      tags: ["walk", "nature", "connection"],
      memories: ["Synchronized steps", "Falling leaves", "First hand-hold"]
    },
    {
      id: 3,
      date: "October 8, 2023",
      title: "Promise Made",
      description: "Under the autumn sky, we promised forever. That sacred vow still echoes in my heart, growing stronger with each passing day.",
      icon: <Star className="w-4 h-4" />,
      color: "from-purple-400 to-violet-500",
      image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
      location: "Sunset Hill",
      weather: "Golden hour, 65°F",
      mood: "Overwhelming love",
      tags: ["promise", "commitment", "forever"],
      memories: ["Golden sunset", "Whispered promises", "Tears of joy"]
    },
    {
      id: 4,
      date: "November 15, 2023",
      title: "Dancing in Rain",
      description: "When the storm caught us, we didn't seek shelter. Instead, we danced in the rain, laughing as the world washed away around us.",
      icon: <Music className="w-4 h-4" />,
      color: "from-blue-400 to-cyan-500",
      image: "https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg?auto=compress&cs=tinysrgb&w=400",
      location: "Downtown Square",
      weather: "Rainy, 58°F",
      mood: "Carefree bliss",
      tags: ["rain", "dance", "spontaneous"],
      memories: ["Soaked clothes", "Spinning around", "Pure laughter"]
    },
    {
      id: 5,
      date: "December 25, 2023",
      title: "Christmas Magic",
      description: "Our first Christmas together, wrapped in love and twinkling lights. The magic wasn't in the gifts, but in being together.",
      icon: <Camera className="w-4 h-4" />,
      color: "from-red-400 to-rose-500",
      image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400",
      location: "Your Family Home",
      weather: "Snowy, 32°F",
      mood: "Warm contentment",
      tags: ["christmas", "family", "traditions"],
      memories: ["Twinkling lights", "Warm hugs", "New traditions"]
    }
  ];

  const progressY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const unsubscribe = progressY.onChange((latest) => {
      setTimelineProgress(latest);
    });
    return unsubscribe;
  }, [progressY]);

  const toggleCardExpansion = (eventId: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedCards(newExpanded);
  };

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      // Handle drag gestures for mobile interaction
    },
    onPinch: ({ offset: [scale] }) => {
      // Handle pinch to zoom
    }
  });

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-white to-soft-pink dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 4 === 0 ? (
              <Heart className="w-3 h-3 text-rose-400/30" />
            ) : i % 4 === 1 ? (
              <Star className="w-2 h-2 text-yellow-400/30" />
            ) : i % 4 === 2 ? (
              <Music className="w-3 h-3 text-purple-400/30" />
            ) : (
              <div className="w-1 h-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full" />
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
            Interactive Love Timeline
          </motion.h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Scroll, tap, and explore our journey through time
          </p>
          
          {/* Enhanced Progress Indicator */}
          <motion.div 
            className="mt-8 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 h-full rounded-full relative"
                style={{ width: `${timelineProgress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Journey Progress</span>
              <span className="text-xs font-semibold text-rose-500">
                {Math.round(timelineProgress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto" {...bind()}>
          {/* Dynamic Timeline Line with Gradient */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700 rounded-full" />
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-rose-400 via-purple-400 to-blue-400 rounded-full shadow-lg"
            style={{ height: `${timelineProgress}%` }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-rose-400"
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 0 0 rgba(244, 63, 94, 0.4)",
                  "0 0 0 10px rgba(244, 63, 94, 0)",
                  "0 0 0 0 rgba(244, 63, 94, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <motion.article
                className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredCard(event.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div
                  className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700 overflow-hidden ${
                    hoveredCard === event.id ? 'border-rose-400 dark:border-rose-400' : ''
                  }`}
                  whileHover={{ 
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                    y: -8
                  }}
                  layout
                >
                  {/* Compact Header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`bg-gradient-to-r ${event.color} p-2 rounded-xl text-white shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {event.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-playfair font-semibold text-gray-800 dark:text-white">
                            {event.title}
                          </h3>
                          <time className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.date}
                          </time>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => setSelectedEvent(event)}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Maximize2 className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        </motion.button>
                        <motion.button
                          onClick={() => toggleCardExpansion(event.id)}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {expandedCards.has(event.id) ? 
                            <ChevronUp className="w-3 h-3 text-gray-600 dark:text-gray-300" /> : 
                            <ChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                          }
                        </motion.button>
                      </div>
                    </div>

                    {/* Compact Image */}
                    {event.image && (
                      <motion.div 
                        className="mb-3 rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-24 object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </motion.div>
                    )}
                    
                    {/* Compact Description */}
                    <p className="font-lato text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    {/* Compact Metadata */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {event.location && (
                        <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.weather && (
                        <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Thermometer className="w-3 h-3 text-blue-400" />
                          <span className="truncate">{event.weather}</span>
                        </div>
                      )}
                      {event.mood && (
                        <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Smile className="w-3 h-3 text-yellow-400" />
                          <span className="truncate">{event.mood}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {event.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gradient-to-r from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 text-xs rounded-full text-gray-600 dark:text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedCards.has(event.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100 dark:border-gray-700"
                      >
                        <div className="p-4 space-y-3">
                          {event.memories && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Special Memories
                              </h4>
                              <div className="space-y-1">
                                {event.memories.map((memory, memIndex) => (
                                  <motion.div
                                    key={memIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: memIndex * 0.1 }}
                                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
                                  >
                                    <Heart className="w-3 h-3 text-rose-400" />
                                    <span>{memory}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {event.tags && event.tags.length > 3 && (
                            <div className="flex flex-wrap gap-1">
                              {event.tags.slice(3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 text-xs rounded-full text-gray-600 dark:text-gray-300"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.article>

              {/* Enhanced Timeline Dot */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              >
                <motion.div
                  className="relative w-8 h-8 cursor-pointer"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <motion.div
                    className={`w-full h-full bg-gradient-to-r ${event.color} rounded-full shadow-lg border-2 border-white dark:border-gray-800`}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(244, 63, 94, 0.4)",
                        "0 0 0 8px rgba(244, 63, 94, 0)",
                        "0 0 0 0 rgba(244, 63, 94, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {event.icon}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedEvent.image && (
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <motion.div
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${selectedEvent.color} px-4 py-2 rounded-full mb-4`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedEvent.icon}
                      <span className="text-sm font-semibold">{selectedEvent.date}</span>
                    </motion.div>
                    <h3 className="text-4xl font-playfair font-bold mb-2">
                      {selectedEvent.title}
                    </h3>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <p className="font-lato text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedEvent.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-gray-800 dark:text-white mb-4">
                      Event Details
                    </h4>
                    <div className="space-y-3">
                      {selectedEvent.location && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <MapPin className="w-5 h-5 text-rose-400" />
                          <span className="text-gray-700 dark:text-gray-300">{selectedEvent.location}</span>
                        </div>
                      )}
                      {selectedEvent.weather && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Thermometer className="w-5 h-5 text-blue-400" />
                          <span className="text-gray-700 dark:text-gray-300">{selectedEvent.weather}</span>
                        </div>
                      )}
                      {selectedEvent.mood && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Smile className="w-5 h-5 text-yellow-400" />
                          <span className="text-gray-700 dark:text-gray-300">{selectedEvent.mood}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEvent.memories && (
                    <div>
                      <h4 className="text-lg font-playfair font-semibold text-gray-800 dark:text-white mb-4">
                        Cherished Memories
                      </h4>
                      <div className="space-y-2">
                        {selectedEvent.memories.map((memory, memIndex) => (
                          <motion.div
                            key={memIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: memIndex * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl"
                          >
                            <Heart className="w-4 h-4 text-rose-400" />
                            <span className="text-gray-700 dark:text-gray-300">{memory}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedEvent.tags && (
                  <div className="mt-6">
                    <h4 className="text-lg font-playfair font-semibold text-gray-800 dark:text-white mb-4">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: tagIndex * 0.1 }}
                          className="px-4 py-2 bg-gradient-to-r from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 rounded-full text-gray-600 dark:text-gray-300 text-sm font-medium"
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveTimeline;