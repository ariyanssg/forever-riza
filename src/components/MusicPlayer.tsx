import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Pause, Play, SkipForward, SkipBack, Upload, Plus, X } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url?: string;
  file?: File;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [playlist, setPlaylist] = useState<Song[]>([
    { 
      id: 1, 
      title: "Our Song", 
      artist: "Forever Riza", 
      duration: "3:45",
      // You can add a URL to an online audio file here
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Example URL
    },
    { 
      id: 2, 
      title: "First Dance", 
      artist: "Love Stories", 
      duration: "4:12" 
    },
    { 
      id: 3, 
      title: "Memories", 
      artist: "Heart & Soul", 
      duration: "3:28" 
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayer(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file');
      return;
    }

    setIsLoading(true);
    const url = URL.createObjectURL(file);
    
    const newSong: Song = {
      id: Date.now(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Custom Upload",
      duration: "Unknown",
      url: url,
      file: file
    };

    setPlaylist(prev => [...prev, newSong]);
    setShowUpload(false);
    setIsLoading(false);
  };

  const removeSong = (songId: number) => {
    setPlaylist(prev => prev.filter(song => song.id !== songId));
    if (currentSong >= playlist.length - 1) {
      setCurrentSong(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentSongData = playlist[currentSong];

  return (
    <AnimatePresence>
      {showPlayer && (
        <motion.div
          className="fixed top-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-gold/20 dark:border-rose-gold/30 overflow-hidden"
            animate={{
              width: isExpanded ? 380 : 'auto',
              height: isExpanded ? 'auto' : 'auto'
            }}
            transition={{ duration: 0.3 }}
          >
            {!isExpanded ? (
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                    aria-label="Expand music player"
                  >
                    <Music className="text-rose-gold" size={20} />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-rose-gold text-white rounded-full hover:bg-rose-gold/80 transition-colors"
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-playfair font-semibold text-gray-800 dark:text-white">
                    Music Player
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowUpload(true)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                      aria-label="Add song"
                    >
                      <Plus className="text-rose-gold" size={16} />
                    </button>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                      aria-label="Minimize player"
                    >
                      <Music className="text-rose-gold" size={16} />
                    </button>
                  </div>
                </div>

                {/* Current Song Info */}
                <div className="mb-4 p-3 bg-gradient-to-r from-rose-gold/10 to-purple-500/10 rounded-lg">
                  <h4 className="font-lato font-semibold text-gray-800 dark:text-white text-sm truncate">
                    {currentSongData?.title || 'No song selected'}
                  </h4>
                  <p className="font-lato text-gray-600 dark:text-gray-300 text-xs">
                    {currentSongData?.artist} • {currentSongData?.duration}
                  </p>
                </div>

                {/* Progress Bar */}
                {currentSongData?.url && (
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #E8B4B8 0%, #E8B4B8 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={prevSong}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                    aria-label="Previous song"
                  >
                    <SkipBack size={16} />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="p-3 bg-rose-gold text-white rounded-full hover:bg-rose-gold/80 transition-colors disabled:opacity-50"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    disabled={!currentSongData?.url}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button
                    onClick={nextSong}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                    aria-label="Next song"
                  >
                    <SkipForward size={16} />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={toggleMute}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-700 dark:text-gray-300"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #E8B4B8 0%, #E8B4B8 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                {/* Playlist */}
                <div className="max-h-40 overflow-y-auto">
                  <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Playlist</h5>
                  {playlist.map((song, index) => (
                    <div
                      key={song.id}
                      className={`flex items-center justify-between p-2 rounded-lg mb-1 cursor-pointer transition-colors ${
                        index === currentSong 
                          ? 'bg-rose-gold/20 text-rose-gold' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setCurrentSong(index)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{song.title}</p>
                        <p className="text-xs opacity-70 truncate">{song.artist}</p>
                      </div>
                      {song.file && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSong(song.id);
                          }}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                          aria-label="Remove song"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Visualizer */}
          {isPlaying && (
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-rose-gold rounded-full"
                  animate={{
                    height: [4, 12, 4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={currentSongData?.url}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(audioRef.current.duration);
              }
            }}
            onError={(e) => {
              console.error('Audio error:', e);
              setIsPlaying(false);
            }}
          />

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <Upload className="w-12 h-12 text-rose-gold mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-gray-800 dark:text-white mb-2">
                  Add Your Song
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Upload an audio file to add to your playlist
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border-2 border-dashed border-rose-gold/30 rounded-lg hover:border-rose-gold/50 transition-colors text-center"
                  disabled={isLoading}
                >
                  <div className="text-rose-gold mb-2">
                    <Upload className="w-8 h-8 mx-auto" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isLoading ? 'Uploading...' : 'Click to select audio file'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Supports MP3, WAV, OGG, M4A
                  </p>
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Or paste a URL to an online audio file:
                  </p>
                  <input
                    type="url"
                    placeholder="https://example.com/song.mp3"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const url = (e.target as HTMLInputElement).value;
                        if (url) {
                          const newSong: Song = {
                            id: Date.now(),
                            title: "Online Song",
                            artist: "External",
                            duration: "Unknown",
                            url: url
                          };
                          setPlaylist(prev => [...prev, newSong]);
                          setShowUpload(false);
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default MusicPlayer;