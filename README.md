# 🌸 Forever Riza - Our Love Story

A beautiful, interactive web application that tells the story of love through an immersive digital experience. This project combines modern web technologies with romantic storytelling to create a personalized love story platform.

![Forever Riza](https://img.shields.io/badge/Love-Story-pink?style=for-the-badge&logo=heart)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Interactive Experience**
- **Smooth Animations**: Powered by Framer Motion for fluid, engaging interactions
- **Responsive Design**: Beautiful on all devices - desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Loading Screen**: Elegant loading experience with progress indicators

### 📅 **Interactive Timeline**
- **Chronological Journey**: Explore your relationship milestones through time
- **Rich Event Details**: Each event includes photos, descriptions, weather, mood, and memories
- **Expandable Cards**: Click to reveal more details about each moment
- **Progress Tracking**: Visual progress indicator as you scroll through the timeline

### 🖼️ **Advanced Memory Gallery**
- **Photo Gallery**: Beautiful grid layout with hover effects
- **Lightbox Viewer**: Full-screen image viewing with zoom, rotate, and download
- **PDF Export**: Generate and download a PDF of your memories
- **Download Options**: Save individual photos or entire galleries

### 🗺️ **Interactive Love Map**
- **Geographic Journey**: Visual representation of your relationship locations
- **Multiple Map Styles**: Choose between romantic, vintage, and modern themes
- **Location Details**: Each spot includes memories, weather, and special moments
- **Journey Animation**: Animated path showing your relationship journey

### 🎵 **Music Player**
- **Background Music**: Ambient soundtrack for the experience
- **Playlist Management**: Add custom songs and manage your playlist
- **Volume Control**: Adjustable volume with mute options
- **Upload Feature**: Upload your own romantic songs

### 💝 **Special Sections**
- **Love Notes**: Personalized messages and letters
- **Apology Section**: Heartfelt apologies and reconciliation
- **Future Vision**: Dreams and plans for the future
- **Countdown Timer**: Special countdown to important dates
- **Quotes Carousel**: Romantic quotes and sayings

### 📱 **Progressive Web App (PWA)**
- **Installable**: Add to home screen for easy access
- **Offline Support**: Works without internet connection
- **App-like Experience**: Full-screen, standalone mode
- **Push Notifications**: Stay updated with new content

### 🎯 **Advanced Features**
- **SEO Optimized**: Complete meta tags and structured data
- **Performance Optimized**: Fast loading with lazy loading and caching
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Cross-browser Compatible**: Works on all modern browsers

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and development server

### **Styling & Animation**
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Production-ready motion library
- **GSAP 3.12.2** - Professional-grade animation library
- **Lucide React 0.344.0** - Beautiful, customizable icons

### **Interactive Features**
- **React Intersection Observer 9.8.1** - Scroll-based animations
- **React Use Gesture 9.1.3** - Advanced gesture handling
- **Three.js 0.158.0** - 3D graphics and animations
- **React Three Fiber 8.15.11** - React renderer for Three.js

### **Maps & Visualization**
- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 4.2.1** - React components for Leaflet

### **Media & Effects**
- **Lottie React 2.4.0** - Lottie animations
- **React Spring 9.7.3** - Spring physics for animations
- **React Confetti 6.1.0** - Celebration effects
- **Canvas Confetti 1.9.2** - Particle effects

### **Utilities**
- **React Helmet Async 2.0.4** - Document head management
- **HTML2Canvas 1.4.1** - Screenshot functionality
- **jsPDF 2.5.1** - PDF generation

### **Development Tools**
- **ESLint 9.9.1** - Code linting
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/forever-riza.git
   cd forever-riza
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
forever-riza/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   ├── pwa-192x192.png    # PWA icons
│   ├── pwa-512x512.png
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── LandingSection.tsx
│   │   ├── InteractiveTimeline.tsx
│   │   ├── AdvancedGallery.tsx
│   │   ├── LoveMap.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── PWAInstallPrompt.tsx
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.tsx
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🎨 Customization

### **Personalizing Your Love Story**

1. **Update Content**: Modify the content in `src/App.tsx` and individual components
2. **Add Photos**: Replace placeholder images with your own memories
3. **Customize Colors**: Update the color palette in `tailwind.config.js`
4. **Add Music**: Upload your romantic songs through the music player
5. **Modify Timeline**: Add your own relationship milestones and events

### **Styling Customization**

The project uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  'soft-pink': '#FFE4E1',
  'lilac': '#E6E6FA',
  'beige': '#F5F5DC',
  'rose-gold': '#E8B4B8',
  'sage': '#C8D5C8',
}
```

### **Font Customization**

Custom fonts are configured for different purposes:
- **Dancing Script**: Romantic headings and titles
- **Playfair Display**: Elegant body text
- **Lato**: Clean, readable interface text

## 📱 PWA Features

### **Installation**
- Users can install the app on their home screen
- Works offline with cached resources
- App-like experience with full-screen mode

### **Manifest Configuration**
The PWA manifest includes:
- App name and description
- Theme colors and icons
- Display mode and orientation
- Categories and language settings

## 🔧 Configuration Files

### **Vite Configuration** (`vite.config.ts`)
- React plugin configuration
- PWA plugin with service worker
- Asset optimization and caching strategies

### **Tailwind Configuration** (`tailwind.config.js`)
- Custom color palette
- Custom animations and keyframes
- Font family definitions
- Responsive breakpoints

### **TypeScript Configuration** (`tsconfig.json`)
- Strict type checking
- React JSX support
- Module resolution settings

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with a single click

### **Netlify**
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### **GitHub Pages**
1. Add GitHub Pages configuration to your repository
2. Set the source to the `dist` folder
3. Enable GitHub Actions for automatic deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💝 Acknowledgments

- **Framer Motion** for beautiful animations
- **Tailwind CSS** for the utility-first styling approach
- **Lucide React** for the beautiful icon set
- **Vite** for the fast development experience
- **React Community** for the amazing ecosystem

## 📞 Support

If you have any questions or need help with customization, please:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Contact the maintainers for personalized support

---

**Made with ❤️ for Riza**

*Every line of code tells a story of love, every animation a dance of hearts, every feature a promise of forever.* 