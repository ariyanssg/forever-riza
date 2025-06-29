import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import LandingSection from './components/LandingSection';
import InteractiveTimeline from './components/InteractiveTimeline';
import AdvancedGallery from './components/AdvancedGallery';
import LoveNotesSection from './components/LoveNotesSection';
import ApologySection from './components/ApologySection';
import FutureVisionSection from './components/FutureVisionSection';
import ClosingSection from './components/ClosingSection';
import FloatingPetals from './components/FloatingPetals';
import MusicPlayer from './components/MusicPlayer';
import SEOHead from './components/SEOHead';
import ThemeToggle from './components/ThemeToggle';
import ParticleBackground from './components/ParticleBackground';
import LoveMap from './components/LoveMap';
import CountdownSection from './components/CountdownSection';
import QuotesCarousel from './components/QuotesCarousel';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const memories = [
    {
      id: 1,
      title: "First Coffee Together",
      date: "October 6, 2023",
      description: "The nervous excitement of our first coffee date, where time seemed to stand still.",
      imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Sunset Walk",
      date: "October 7, 2023",
      description: "Hand in hand, we watched the sun paint the sky in colors that matched our feelings.",
      imageUrl: "https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Promise Made",
      date: "December 25, 2023",
      description: "The day we promised to write our story together, one page at a time.",
      imageUrl: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  useEffect(() => {
    // Enhanced loading with progress
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="relative overflow-hidden transition-colors duration-300">
          <SEOHead />
          <ParticleBackground />
          <FloatingPetals />
          <MusicPlayer />
          <ThemeToggle />
          <PWAInstallPrompt />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div id="landing">
              <LandingSection />
            </div>
            <div id="timeline">
              <InteractiveTimeline />
            </div>
            <div id="gallery">
              <AdvancedGallery memories={memories} />
            </div>
            <div id="notes">
              <LoveNotesSection />
            </div>
            <div id="map">
              <LoveMap />
            </div>
            <div id="countdown">
              <CountdownSection />
            </div>
            <div id="quotes">
              <QuotesCarousel />
            </div>
            <div id="apology">
              <ApologySection />
            </div>
            <div id="future">
              <FutureVisionSection />
            </div>
            <div id="closing">
              <ClosingSection />
            </div>
          </motion.div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;