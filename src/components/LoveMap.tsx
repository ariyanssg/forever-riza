import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Heart, Calendar, Camera, Navigation, Zap, Star, Sparkles, Clock, Thermometer, Music, Coffee, TreePine, Sun, Cloud, Plane, Car, Scaling as Walking } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  description: string;
  date: string;
  coordinates: [number, number];
  memory: string;
  image: string;
  category: 'date' | 'adventure' | 'milestone';
  weather?: string;
  time?: string;
  transport?: 'walking' | 'car' | 'plane';
  mood: string;
  soundtrack?: string;
  specialMoment?: string;
  photos?: number;
  duration?: string;
}

const LoveMap: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [mapStyle, setMapStyle] = useState<'romantic' | 'vintage' | 'modern'>('romantic');
  const [showPath, setShowPath] = useState(true);
  const [animateJourney, setAnimateJourney] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  const locations: Location[] = [
    {
      id: 1,
      name: "Coffee Shop",
      description: "Where we first met",
      date: "October 6, 2023",
      coordinates: [25, 35],
      memory: "The nervous excitement of our first coffee date, where time seemed to stand still and conversation flowed like we'd known each other forever.",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: 'date',
      weather: 'Sunny ☀️',
      time: '2:30 PM',
      transport: 'walking',
      mood: 'Nervous excitement 💕',
      soundtrack: 'Soft jazz playing in background',
      specialMoment: 'You laughed at my terrible joke',
      photos: 3,
      duration: '2 hours'
    },
    {
      id: 2,
      name: "Central Park",
      description: "Our first walk together",
      date: "October 7, 2023",
      coordinates: [45, 55],
      memory: "Hand in hand, we strolled through the autumn leaves, sharing dreams and discovering how perfectly our steps matched.",
      image: "https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: 'adventure',
      weather: 'Partly cloudy ⛅',
      time: '4:00 PM',
      transport: 'walking',
      mood: 'Pure bliss 🌟',
      soundtrack: 'Birds chirping, leaves rustling',
      specialMoment: 'First time holding hands',
      photos: 12,
      duration: '3 hours'
    },
    {
      id: 3,
      name: "Sunset Point",
      description: "Where you said yes",
      date: "December 25, 2023",
      coordinates: [75, 25],
      memory: "Under the golden sky, we promised each other forever. The sunset painted everything in colors that matched our hearts.",
      image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: 'milestone',
      weather: 'Clear skies 🌅',
      time: '6:15 PM',
      transport: 'car',
      mood: 'Overwhelming love 💖',
      soundtrack: 'Our favorite song playing',
      specialMoment: 'The moment you said yes',
      photos: 25,
      duration: '4 hours'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'date': return <Coffee className="w-3 h-3" />;
      case 'adventure': return <TreePine className="w-3 h-3" />;
      case 'milestone': return <Star className="w-3 h-3" />;
      default: return <Heart className="w-3 h-3" />;
    }
  };

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case 'walking': return <Walking className="w-3 h-3" />;
      case 'car': return <Car className="w-3 h-3" />;
      case 'plane': return <Plane className="w-3 h-3" />;
      default: return <Navigation className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'date': return 'from-rose-400 to-pink-500';
      case 'adventure': return 'from-green-400 to-emerald-500';
      case 'milestone': return 'from-purple-400 to-violet-500';
      default: return 'from-rose-400 to-pink-500';
    }
  };

  const startJourneyAnimation = () => {
    setAnimateJourney(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= locations.length - 1) {
          clearInterval(interval);
          setAnimateJourney(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
  };

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        startJourneyAnimation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const mapStyles = {
    romantic: 'bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-purple-900/20',
    vintage: 'bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20',
    modern: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20'
  };

  return (
    <section className="py-20 bg-gradient-to-b from-beige to-white dark:from-gray-900 dark:to-gray-800">
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
            Our Love Map
          </motion.h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Every place holds a piece of our story, every location a cherished memory
          </p>

          {/* Map Style Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {(['romantic', 'vintage', 'modern'] as const).map((style) => (
              <motion.button
                key={style}
                onClick={() => setMapStyle(style)}
                className={`px-4 py-2 rounded-full text-sm font-lato transition-all duration-300 ${
                  mapStyle === style 
                    ? 'bg-rose-gold text-white shadow-lg' 
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-rose-gold/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={() => setShowPath(!showPath)}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-4 h-4" />
              <span className="text-sm font-lato">{showPath ? 'Hide' : 'Show'} Path</span>
            </motion.button>
            
            <motion.button
              onClick={startJourneyAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-rose-gold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-lato">Animate Journey</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Enhanced Interactive Map */}
          <motion.div
            ref={mapRef}
            className={`relative ${mapStyles[mapStyle]} rounded-3xl p-8 mb-8 overflow-hidden shadow-2xl border border-white/20 dark:border-gray-600/20`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ minHeight: '500px' }}
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {i % 4 === 0 ? (
                    <Heart className="w-4 h-4 text-rose-400/20" />
                  ) : i % 4 === 1 ? (
                    <Star className="w-3 h-3 text-yellow-400/20" />
                  ) : i % 4 === 2 ? (
                    <Sparkles className="w-3 h-3 text-purple-400/20" />
                  ) : (
                    <div className="w-2 h-2 bg-gradient-to-r from-rose-400/20 to-purple-400/20 rounded-full" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Animated Path */}
            {showPath && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {locations.map((_, index) => {
                  if (index === locations.length - 1) return null;
                  const current = locations[index];
                  const next = locations[index + 1];
                  
                  return (
                    <motion.path
                      key={index}
                      d={`M ${current.coordinates[0]}% ${current.coordinates[1]}% Q ${(current.coordinates[0] + next.coordinates[0]) / 2}% ${Math.min(current.coordinates[1], next.coordinates[1]) - 10}% ${next.coordinates[0]}% ${next.coordinates[1]}%`}
                      stroke="url(#pathGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { 
                        pathLength: animateJourney && index <= currentStep ? 1 : 1, 
                        opacity: 1 
                      } : {}}
                      transition={{ 
                        duration: 2, 
                        delay: animateJourney ? index * 2 : 1 + index * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E8B4B8" />
                    <stop offset="50%" stopColor="#C8D5C8" />
                    <stop offset="100%" stopColor="#E6E6FA" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* Enhanced Location Markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${location.coordinates[0]}%`,
                  top: `${location.coordinates[1]}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { 
                  opacity: animateJourney && index > currentStep ? 0.3 : 1, 
                  scale: animateJourney && index === currentStep ? 1.3 : 1 
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: animateJourney ? index * 2 : index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                onClick={() => setSelectedLocation(location)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Enhanced Marker */}
                <div className="relative">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(location.category)} rounded-full shadow-xl flex items-center justify-center text-white border-4 border-white dark:border-gray-800`}
                    animate={hoveredLocation === location.id ? {
                      boxShadow: [
                        "0 0 0 0 rgba(244, 63, 94, 0.4)",
                        "0 0 0 20px rgba(244, 63, 94, 0)",
                        "0 0 0 0 rgba(244, 63, 94, 0)"
                      ]
                    } : {}}
                    transition={{ duration: 1.5, repeat: hoveredLocation === location.id ? Infinity : 0 }}
                  >
                    <MapPin className="w-6 h-6" />
                  </motion.div>
                  
                  {/* Floating Heart */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-3 h-3 text-white fill-current" />
                  </motion.div>

                  {/* Category Badge */}
                  <motion.div
                    className={`absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r ${getCategoryColor(location.category)} rounded-full flex items-center justify-center text-white shadow-lg`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {getCategoryIcon(location.category)}
                  </motion.div>
                </div>

                {/* Enhanced Tooltip */}
                <AnimatePresence>
                  {hoveredLocation === location.id && (
                    <motion.div
                      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap border border-gray-200 dark:border-gray-600 z-20"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-lato font-semibold text-gray-800 dark:text-white text-sm">
                            {location.name}
                          </span>
                          {getTransportIcon(location.transport!)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{location.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{location.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            <span>{location.photos} photos</span>
                          </div>
                        </div>
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Journey Progress Indicator */}
            {animateJourney && (
              <motion.div
                className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-white">
                      Journey in Progress
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Step {currentStep + 1} of {locations.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700"
                onClick={() => setSelectedLocation(location)}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${getCategoryColor(location.category)} rounded-full text-white text-xs font-semibold flex items-center gap-1`}>
                    {getCategoryIcon(location.category)}
                    <span>{location.category}</span>
                  </div>

                  {/* Photo Count */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    <span>{location.photos}</span>
                  </div>

                  {/* Location Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-playfair font-semibold text-white text-lg mb-1">
                      {location.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">{location.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{location.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{location.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Thermometer className="w-3 h-3 text-blue-400" />
                      <span className="truncate">{location.weather}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      {getTransportIcon(location.transport!)}
                      <span className="truncate">{location.transport}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-400" />
                      <span className="italic">{location.mood}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Location Detail Modal */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLocation(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Header Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${getCategoryColor(selectedLocation.category)} px-4 py-2 rounded-full text-white`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {getCategoryIcon(selectedLocation.category)}
                        <span className="text-sm font-semibold">{selectedLocation.category}</span>
                      </motion.div>
                      
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                        <Camera className="w-4 h-4" />
                        <span>{selectedLocation.photos} photos</span>
                      </div>
                    </div>
                    
                    <h3 className="text-4xl font-playfair font-bold text-white mb-2">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-white/90 text-lg">{selectedLocation.description}</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Memory & Details */}
                    <div>
                      <h4 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white mb-4">
                        Our Memory
                      </h4>
                      <p className="font-lato text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        {selectedLocation.memory}
                      </p>
                      
                      {selectedLocation.specialMoment && (
                        <div className="p-4 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl mb-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-rose-400" />
                            <span className="font-semibold text-gray-800 dark:text-white">Special Moment</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 italic">
                            "{selectedLocation.specialMoment}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Details Grid */}
                    <div>
                      <h4 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white mb-4">
                        Details
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <Calendar className="w-5 h-5 text-rose-400" />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Date</div>
                              <div className="font-semibold text-gray-800 dark:text-white">{selectedLocation.date}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
                              <div className="font-semibold text-gray-800 dark:text-white">{selectedLocation.time}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Thermometer className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Weather</div>
                            <div className="font-semibold text-gray-800 dark:text-white">{selectedLocation.weather}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          {getTransportIcon(selectedLocation.transport!)}
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Transport</div>
                            <div className="font-semibold text-gray-800 dark:text-white capitalize">{selectedLocation.transport}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl">
                          <Heart className="w-5 h-5 text-rose-400" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Mood</div>
                            <div className="font-semibold text-gray-800 dark:text-white">{selectedLocation.mood}</div>
                          </div>
                        </div>

                        {selectedLocation.soundtrack && (
                          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <Music className="w-5 h-5 text-purple-400" />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Soundtrack</div>
                              <div className="font-semibold text-gray-800 dark:text-white">{selectedLocation.soundtrack}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveMap;