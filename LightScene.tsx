
import React from 'react';
import type { FC } from 'react';
import { Star, Eye } from 'lucide-react';
import { LIT_COLOR_RGB } from './App'; // Import the constant

interface LightSceneProps {
  distance: number;
  intensity: number; // This is perceivedIntensity
  surfaceColor: string;
  minDistance: number;
  maxDistance: number;
}

// const LIT_COLOR_RGB = { r: 253, g: 224, b: 71 }; // Removed local definition

const LightScene: FC<LightSceneProps> = ({ distance, intensity, surfaceColor, minDistance, maxDistance }) => {
  const lightSourceWidth = 64; 
  const minVisualMargin = lightSourceWidth + 20; 
  const maxVisualSpan = 350; 

  const distanceRatio = (distance - minDistance) / (maxDistance - minDistance);
  const surfaceMarginLeft = minVisualMargin + distanceRatio * maxVisualSpan;

  // Adjust light ray opacity to be slightly more sensitive
  const rayOpacity = intensity > 0.02 ? intensity * 0.5 : 0;


  return (
    <div className="relative w-full h-56 md:h-64 bg-slate-900/50 border border-slate-700 rounded-lg p-4 flex items-center overflow-hidden mb-6 shadow-inner">
      {/* Decorative light rays */}
      <div 
        className="absolute top-1/2 left-12 md:left-16 h-1 w-full origin-left transition-all duration-300 ease-in-out"
        style={{
          background: `radial-gradient(ellipse at left, rgba(253, 224, 71, ${intensity * 0.5}) 0%, transparent 70%)`,
          transform: `translateY(-50%) scaleX(${0.2 + distanceRatio * 0.8})`, 
          opacity: rayOpacity, // Use adjusted opacity
        }}
        aria-hidden="true"
      />

      {/* Light Source */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-10">
        <Star 
          className="text-yellow-400 w-12 h-12 md:w-16 md:h-16 animate-pulse-star" 
          // Base filter and scale are now handled by the animation in CSS
          aria-label="반짝이는 광원"
        />
      </div>

      {/* Observation Surface (Eye Icon) */}
      <Eye
        className="relative w-20 h-20 md:w-24 md:h-24 transition-all duration-300 ease-in-out" 
        style={{
          color: surfaceColor, 
          marginLeft: `${Math.max(lightSourceWidth + 16, surfaceMarginLeft)}px`, 
          filter: `drop-shadow(0 0 ${5 + 20 * intensity}px rgba(${LIT_COLOR_RGB.r}, ${LIT_COLOR_RGB.g}, ${LIT_COLOR_RGB.b}, ${0.2 + intensity * 0.5}))`,
        }}
        aria-live="polite"
        aria-label={`관찰 눈: 현재 밝기 ${(intensity * 100).toFixed(1)}`}
      />
    </div>
  );
};

export default LightScene;
