import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Download, Share2, Heart, Maximize, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Confetti from 'react-confetti';

interface AdvancedGalleryProps {
  memories: Array<{
    id: number;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
  }>;
}

const AdvancedGallery: React.FC<AdvancedGalleryProps> = ({ memories }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedMemory, setSelectedMemory] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const downloadImage = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const generatePDF = async () => {
    if (!galleryRef.current) return;
    
    const canvas = await html2canvas(galleryRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('our-memories.pdf');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-soft-pink">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="container mx-auto px-4" ref={galleryRef}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-4">
            Advanced Memory Gallery
          </h2>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-6 py-3 bg-rose-gold text-white rounded-full hover:bg-rose-gold/80 transition-all duration-300"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedMemory(memory)}
              whileHover={{ y: -10, rotateY: 5 }}
            >
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-playfair text-lg font-semibold mb-1">
                    {memory.title}
                  </h3>
                  <p className="text-white/80 text-sm">{memory.date}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(memory.imageUrl, memory.title);
                  }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <Download size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Lightbox */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <ZoomIn size={20} />
                </button>
                <button
                  onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <ZoomOut size={20} />
                </button>
                <button
                  onClick={() => setRotation(rotation + 90)}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <RotateCw size={20} />
                </button>
                <button
                  onClick={() => downloadImage(selectedMemory.imageUrl, selectedMemory.title)}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                >
                  <Download size={20} />
                </button>
              </div>

              <motion.img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.title}
                className="w-full max-h-[70vh] object-contain rounded-lg"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease'
                }}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              />
              
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-playfair text-white mb-2">
                  {selectedMemory.title}
                </h3>
                <p className="text-white/80">{selectedMemory.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdvancedGallery;