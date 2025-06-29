import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, X, ChevronLeft, ChevronRight, Filter, Grid, List } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  caption: string;
  category: string;
  weather?: string;
}

const MemoryGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  const [currentImageFilter, setCurrentImageFilter] = useState<string>('none');

  const memories: Memory[] = [
    {
      id: 1,
      title: "First Coffee Together",
      date: "October 6, 2023",
      description: "The nervous excitement of our first coffee date, where time seemed to stand still.",
      imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Two hearts, one table, endless possibilities",
      category: "dates",
      weather: "Sunny, 72°F"
    },
    {
      id: 2,
      title: "Sunset Walk",
      date: "October 7, 2023",
      description: "Hand in hand, we watched the sun paint the sky in colors that matched our feelings.",
      imageUrl: "https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Every sunset reminds me of this perfect moment",
      category: "adventures",
      weather: "Clear, 68°F"
    },
    {
      id: 3,
      title: "Laughing Together",
      date: "October 8, 2023",
      description: "The moment I knew your laugh was my favorite sound in the world.",
      imageUrl: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Your laughter is my favorite melody",
      category: "moments",
      weather: "Partly cloudy, 70°F"
    },
    {
      id: 4,
      title: "Dancing in the Rain",
      date: "November 15, 2023",
      description: "When the rain caught us, we didn't run for shelter - we danced.",
      imageUrl: "https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Dancing with you in the rain felt like magic",
      category: "adventures",
      weather: "Rainy, 65°F"
    },
    {
      id: 5,
      title: "Cozy Evening",
      date: "December 1, 2023",
      description: "Wrapped in blankets, sharing dreams and hot chocolate.",
      imageUrl: "https://images.pexels.com/photos/374103/pexels-photo-374103.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Home is wherever you are",
      category: "moments",
      weather: "Cold, 45°F"
    },
    {
      id: 6,
      title: "Promise Made",
      date: "December 25, 2023",
      description: "The day we promised to write our story together, one page at a time.",
      imageUrl: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Forever starts with a promise",
      category: "milestones",
      weather: "Snowy, 32°F"
    }
  ];

  const categories = ['all', 'dates', 'adventures', 'moments', 'milestones'];
  const imageFilters = ['none', 'sepia', 'grayscale', 'vintage', 'warm', 'cool'];

  const filteredMemories = filter === 'all' 
    ? memories 
    : memories.filter(memory => memory.category === filter);

  const nextMemory = () => {
    if (!selectedMemory) return;
    const currentIndex = filteredMemories.findIndex(m => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % filteredMemories.length;
    setSelectedMemory(filteredMemories[nextIndex]);
  };

  const prevMemory = () => {
    if (!selectedMemory) return;
    const currentIndex = filteredMemories.findIndex(m => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + filteredMemories.length) % filteredMemories.length;
    setSelectedMemory(filteredMemories[prevIndex]);
  };

  const getFilterClass = (filter: string) => {
    switch (filter) {
      case 'sepia': return 'sepia';
      case 'grayscale': return 'grayscale';
      case 'vintage': return 'sepia contrast-125 brightness-110';
      case 'warm': return 'hue-rotate-15 saturate-125';
      case 'cool': return 'hue-rotate-180 saturate-110';
      default: return '';
    }
  };

  return (
    <section id="memories" className="py-20 bg-gradient-to-b from-soft-pink to-beige dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 dark:text-white mb-4">
            Our Memory Gallery
          </h2>
          <p className="text-xl font-playfair text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every photo tells a story, every story holds a piece of my heart
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-lato text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-gold"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-rose-gold text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-rose-gold text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className={`max-w-6xl mx-auto ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredMemories.map((memory, index) => (
            <motion.article
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer ${
                viewMode === 'list' 
                  ? 'flex gap-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700' 
                  : 'bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rotate-1 hover:rotate-0 border border-gray-100 dark:border-gray-700'
              }`}
              onClick={() => setSelectedMemory(memory)}
            >
              <div className={`relative overflow-hidden rounded-lg ${
                viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'mb-4'
              }`}>
                <img
                  src={memory.imageUrl}
                  alt={memory.title}
                  className={`w-full ${viewMode === 'list' ? 'h-full' : 'h-64'} object-cover transition-transform duration-300 group-hover:scale-110`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </div>
              
              <div className={viewMode === 'list' ? 'flex-1' : 'text-center'}>
                <h3 className="font-playfair text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {memory.title}
                </h3>
                <p className="font-lato text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <time dateTime={memory.date}>{memory.date}</time>
                  {memory.weather && (
                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {memory.weather}
                    </span>
                  )}
                </p>
                <p className="font-lato text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                  "{memory.caption}"
                </p>
                {viewMode === 'list' && (
                  <p className="font-lato text-sm text-gray-600 dark:text-gray-300">
                    {memory.description}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>

              <button
                onClick={prevMemory}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextMemory}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Image Filters */}
              <div className="absolute top-4 left-4 z-10">
                <select
                  value={currentImageFilter}
                  onChange={(e) => setCurrentImageFilter(e.target.value)}
                  className="bg-black/50 text-white text-sm rounded px-2 py-1 border-none focus:outline-none"
                >
                  {imageFilters.map(filter => (
                    <option key={filter} value={filter} className="bg-gray-800">
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.title}
                className={`w-full h-96 object-cover transition-all duration-300 ${getFilterClass(currentImageFilter)}`}
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-playfair font-semibold text-gray-800 dark:text-white">
                    {selectedMemory.title}
                  </h3>
                  {selectedMemory.weather && (
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                      {selectedMemory.weather}
                    </span>
                  )}
                </div>
                <p className="font-lato text-gray-600 dark:text-gray-300 mb-4">
                  <time dateTime={selectedMemory.date}>{selectedMemory.date}</time>
                </p>
                <p className="font-lato text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {selectedMemory.description}
                </p>
                <blockquote className="font-playfair text-lg italic text-rose-gold border-l-4 border-rose-gold pl-4">
                  "{selectedMemory.caption}"
                </blockquote>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;