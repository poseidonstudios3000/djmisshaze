import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Wedding gallery images
import weddingImg1 from "@assets/wedding/gallery/Ada-Street-Chicago-Wedding-DJ-Miss-Haze.webp";
import weddingImg2 from "@assets/wedding/gallery/Broadmoor-Colorado-Springs-Wedding-DJ-Miss-Haze.webp";
import weddingImg3 from "@assets/wedding/gallery/dj-miss-haze-best-wedding-dj-book-now.webp";
import weddingImg4 from "@assets/wedding/gallery/dj-miss-haze-best-wedding-dj-in-chicago-book-now.webp";
import weddingImg5 from "@assets/wedding/gallery/DJ-Miss-Haze-club-type-wedding-bride.webp";
import weddingImg6 from "@assets/wedding/gallery/dj-miss-haze-letting-bride-spin-at-wedding-colorado.webp";
import weddingImg7 from "@assets/wedding/gallery/DJ-Miss-Haze-newlyweds-1st-Dance.webp";
import weddingImg8 from "@assets/wedding/gallery/DJ-Miss-Haze-wedding-DJ-bouquet-toss.webp";
import weddingImg9 from "@assets/wedding/gallery/dj-miss-haze-wedding-dj-chicago-dallas-denver.webp";
import weddingImg10 from "@assets/wedding/gallery/DJ-Miss-Haze-Wedding-DJ-Colorado.webp";
import weddingImg11 from "@assets/wedding/gallery/dj-miss-haze-wedding-dj-in-colorado.webp";
import weddingImg12 from "@assets/wedding/gallery/dj-miss-haze-wedding-dj-top-rated.webp";
import weddingImg13 from "@assets/wedding/gallery/DJ-Miss-Haze-Wedding-DJ-Vibe.webp";
import weddingImg14 from "@assets/wedding/gallery/DJ-Miss-Haze-Wedding-Venue.webp";
import weddingImg15 from "@assets/wedding/gallery/Estes-Park-Resort-CO-Wedding-couple-and-dj-miss-haze.webp";
import weddingImg16 from "@assets/wedding/gallery/Estes-Park-Resort-dancing-bride-DJ-Miss-Haze.webp";
import weddingImg17 from "@assets/wedding/gallery/Estes-Park-Resort-Wedding-DJ-Miss-Haze.webp";
import weddingImg18 from "@assets/wedding/gallery/hype-bride-wedding-reception.webp";
import weddingImg19 from "@assets/wedding/gallery/The-Gardenia-Venue-Valley-View-Texas-Wedding-DJ-Miss-Haze.webp";
import weddingImg20 from "@assets/wedding/gallery/Societe-Privee-Chicago-Wedding-Network.webp";
import weddingImg21 from "@assets/wedding/gallery/Wedding-DJ-Three-Peaks-Ranch-DJ-Miss-Haze-COLORADO.webp";

// Private gallery images
import privateImg1 from "@assets/private/gallery/Private-Event-DJ-Miss-Haze.webp";
import privateImg2 from "@assets/private/gallery/Private-Event-DJ-Chicago.webp";
import privateImg3 from "@assets/private/gallery/Private-Events-DJ-energy-chicago.webp";
import privateImg4 from "@assets/private/gallery/DJ-Miss-Haze-Event-DJ-and-MC.webp";
import privateImg5 from "@assets/private/gallery/Pro-Mobile-DJ-Chicago.webp";
import privateImg6 from "@assets/private/gallery/Private-Event-book-DJ-now-Colorado.webp";
import privateImg7 from "@assets/private/gallery/female-DJ-chicago-rooftop.webp";
import privateImg8 from "@assets/private/gallery/Female-DJ-Glenview-Illinois.webp";

// Other events gallery images
import otherImg1 from "@assets/other/gallery/DJ-Miss-Haze-event-dj-chicago.webp";
import otherImg2 from "@assets/other/gallery/Female-DJ-book-now-Colorado.webp";
import otherImg3 from "@assets/other/gallery/Mobile-DJ-Chicago-DJ-Miss-Haze.webp";
import otherImg4 from "@assets/other/gallery/Societe-Privee-DJ-Miss-Haze.webp";

// Corporate gallery images
import corpImg1 from "@assets/corporate/gallery/Brand-Event-DJ-Setup-Chicago.webp";
import corpImg2 from "@assets/corporate/gallery/Corporate-DJ-Chicago-IL-DJ-Miss-Haze.webp";
import corpImg3 from "@assets/corporate/gallery/Corporate-DJ-Miss-Haze.webp";
import corpImg4 from "@assets/corporate/gallery/Corporate-Event-DJ-Miss-Haze-Kansas-City-MO.webp";
import corpImg5 from "@assets/corporate/gallery/Corporate-Event-DJ-Miss-Haze.webp";
import corpImg6 from "@assets/corporate/gallery/Corporate-Event-DJ-University-of-Chicago-DJ-Miss-Haze-Eva-Ho-Photography.webp";
import corpImg7 from "@assets/corporate/gallery/Corporate-Event-with-DJ-Miss-Haze.webp";
import corpImg8 from "@assets/corporate/gallery/DJ-Miss-Haze-Chicago-2.webp";
import corpImg9 from "@assets/corporate/gallery/DJ-Miss-Haze-Chicago.webp";
import corpImg10 from "@assets/corporate/gallery/DJ-Miss-Haze-Company-Event-DJ.webp";
import corpImg11 from "@assets/corporate/gallery/DJ-Miss-Haze-Converse-onbrand.webp";
import corpImg12 from "@assets/corporate/gallery/DJ-Miss-Haze-Corporate-DJ.webp";
import corpImg13 from "@assets/corporate/gallery/DJ-Miss-Haze-Corporate-Event-DJ.webp";
import corpImg14 from "@assets/corporate/gallery/DJ-Miss-Haze-Corporate-Event-DJ-1.webp";
import corpImg15 from "@assets/corporate/gallery/DJ-Miss-Haze-Corporate-Event-DJ1.webp";
import corpImg16 from "@assets/corporate/gallery/Famous-Footwear-DJ-Miss-Haze.webp";
import corpImg17 from "@assets/corporate/gallery/JE-Dunn-Corporate-Event-Photo-Anniversary-Event.webp";
import corpImg18 from "@assets/corporate/gallery/JEDunnChristmasParty2024PRINT-1267.webp";
import corpImg19 from "@assets/corporate/gallery/Kansas-City-Corporate-Event.webp";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  span?: string;
}

const weddingImages: GalleryImage[] = [
  { id: 1, src: weddingImg1, title: "Ada Street Chicago Wedding" },
  { id: 2, src: weddingImg2, title: "Broadmoor Colorado Springs Wedding" },
  { id: 3, src: weddingImg3, title: "Best Wedding DJ Book Now" },
  { id: 4, src: weddingImg4, title: "Best Wedding DJ in Chicago" },
  { id: 5, src: weddingImg5, title: "Club Style Wedding Bride" },
  { id: 6, src: weddingImg6, title: "Bride Spinning at Wedding Colorado" },
  { id: 7, src: weddingImg7, title: "Newlyweds First Dance" },
  { id: 8, src: weddingImg8, title: "Wedding DJ Bouquet Toss" },
  { id: 9, src: weddingImg9, title: "Wedding DJ Chicago Dallas Denver" },
  { id: 10, src: weddingImg10, title: "Wedding DJ Colorado" },
  { id: 11, src: weddingImg11, title: "Wedding DJ in Colorado" },
  { id: 12, src: weddingImg12, title: "Top Rated Wedding DJ" },
  { id: 13, src: weddingImg13, title: "Wedding DJ Vibe" },
  { id: 14, src: weddingImg14, title: "Wedding Venue" },
  { id: 15, src: weddingImg15, title: "Estes Park Resort Wedding Couple" },
  { id: 16, src: weddingImg16, title: "Estes Park Resort Dancing Bride" },
  { id: 17, src: weddingImg17, title: "Estes Park Resort Wedding" },
  { id: 18, src: weddingImg18, title: "Hype Bride Wedding Reception" },
  { id: 19, src: weddingImg19, title: "The Gardenia Venue Valley View Texas" },
  { id: 20, src: weddingImg20, title: "Societe Privee Chicago Wedding Network" },
  { id: 21, src: weddingImg21, title: "Three Peaks Ranch Colorado Wedding" },
];

const corporateImages: GalleryImage[] = [
  { id: 1, src: corpImg1, title: "Brand Event DJ Setup Chicago" },
  { id: 2, src: corpImg2, title: "Corporate DJ Chicago IL" },
  { id: 3, src: corpImg3, title: "Corporate DJ Miss Haze" },
  { id: 4, src: corpImg4, title: "Corporate Event DJ Kansas City MO" },
  { id: 5, src: corpImg5, title: "Corporate Event DJ Miss Haze" },
  { id: 6, src: corpImg6, title: "University of Chicago Event" },
  { id: 7, src: corpImg7, title: "Corporate Event with DJ Miss Haze" },
  { id: 8, src: corpImg8, title: "DJ Miss Haze Chicago" },
  { id: 9, src: corpImg9, title: "DJ Miss Haze Chicago Event" },
  { id: 10, src: corpImg10, title: "DJ Miss Haze Company Event" },
  { id: 11, src: corpImg11, title: "DJ Miss Haze x Converse" },
  { id: 12, src: corpImg12, title: "DJ Miss Haze Corporate DJ" },
  { id: 13, src: corpImg13, title: "DJ Miss Haze Corporate Event" },
  { id: 14, src: corpImg14, title: "Corporate Event DJ Performance" },
  { id: 15, src: corpImg15, title: "Corporate Event Entertainment" },
  { id: 16, src: corpImg16, title: "Famous Footwear x DJ Miss Haze" },
  { id: 17, src: corpImg17, title: "JE Dunn Corporate Anniversary Event" },
  { id: 18, src: corpImg18, title: "JE Dunn Christmas Party 2024" },
  { id: 19, src: corpImg19, title: "Kansas City Corporate Event" },
];

const privateImages: GalleryImage[] = [
  { id: 1, src: privateImg1, title: "Private Event DJ Miss Haze" },
  { id: 2, src: privateImg2, title: "Private Event DJ Chicago" },
  { id: 3, src: privateImg3, title: "Private Events DJ Energy Chicago" },
  { id: 4, src: privateImg4, title: "DJ Miss Haze Event DJ and MC" },
  { id: 5, src: privateImg5, title: "Pro Mobile DJ Chicago" },
  { id: 6, src: privateImg6, title: "Private Event Book DJ Now Colorado" },
  { id: 7, src: privateImg7, title: "Female DJ Chicago Rooftop" },
  { id: 8, src: privateImg8, title: "Female DJ Glenview Illinois" },
];

const otherImages: GalleryImage[] = [
  { id: 1, src: otherImg1, title: "Event DJ Miss Haze Chicago" },
  { id: 2, src: otherImg2, title: "Female DJ Book Now Colorado" },
  { id: 3, src: otherImg3, title: "Mobile DJ Chicago DJ Miss Haze" },
  { id: 4, src: otherImg4, title: "Societe Privee DJ Miss Haze" },
];

export function GalleryPreview() {
  const { layout } = useTheme();
  const isCorporate = layout === "corporate_event";
  const isPrivate = layout === "private_event";
  const isPrShow = layout === "pr_show";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const preloadedSet = useRef<Set<string>>(new Set());

  const images = isCorporate ? corporateImages : isPrivate ? privateImages : isPrShow ? otherImages : weddingImages;

  useEffect(() => {
    setCurrentIndex(0);
    preloadedSet.current.clear();
  }, [layout]);

  // Preload only current + next 2 images ahead
  useEffect(() => {
    for (let offset = 0; offset <= 2; offset++) {
      const idx = (currentIndex + offset) % images.length;
      const src = images[idx].src;
      if (!preloadedSet.current.has(src)) {
        preloadedSet.current.add(src);
        const img = new Image();
        img.src = src;
      }
    }
  }, [currentIndex, images]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const safeIndex = Math.min(currentIndex, images.length - 1);
  const galleryTitle = isCorporate ? "Gallery" : isPrivate ? "Private Event Gallery" : isPrShow ? "Events Gallery" : "Wedding Gallery";

  return (
    <>
      <div className="space-y-6 md:space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-4xl font-black font-display mb-2 uppercase">{galleryTitle}</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div 
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[safeIndex].src}
                alt={images[safeIndex].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-bold text-lg md:text-xl text-white font-display">
                {images[safeIndex].title}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {safeIndex + 1} / {images.length}
              </p>
            </div>

            <button
              onClick={goPrev}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Previous image"
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all z-10"
              aria-label="Next image"
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5 z-10 flex-wrap max-w-md mx-auto px-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === safeIndex 
                      ? "bg-primary w-6" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  data-testid={`button-gallery-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
