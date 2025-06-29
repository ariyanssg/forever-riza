import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
  emoji: string;
}

const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const petalEmojis = ['🌸', '🌺', '🌼', '💖', '💕', '✨', '🦋'];

  const generatePetals = useMemo(() => {
    return () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 20; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -50,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)]
        });
      }
      setPetals(newPetals);
    };
  }, []);

  useEffect(() => {
    generatePetals();
    
    const handleResize = () => generatePetals();
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [generatePetals]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-60 select-none"
          style={{
            fontSize: `${petal.scale * 20 + 10}px`,
          }}
          initial={{
            x: petal.x,
            y: petal.y,
            rotate: petal.rotation,
            scale: petal.scale,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: petal.rotation + 360,
            x: petal.x + Math.sin(petal.id + Date.now() * 0.001) * 100,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
      
      {/* Interactive petals that follow mouse */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`mouse-${i}`}
          className="absolute pointer-events-none opacity-40 text-2xl select-none"
          animate={{
            x: mousePosition.x - 10 + Math.sin(Date.now() * 0.01 + i) * 20,
            y: mousePosition.y - 10 + Math.cos(Date.now() * 0.01 + i) * 20,
            rotate: Date.now() * 0.1 + i * 72,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            delay: i * 0.1
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;