
import React from 'react';
import type { FC } from 'react';
import { Ruler } from 'lucide-react';

interface ControlsProps {
  distance: number;
  intensity: number; // This is perceivedIntensity, kept for potential future use or if other elements depend on it.
  physicalIntensity: number; // This is the raw (minDistance/distance)^2
  onDistanceChange: (distance: number) => void;
  minDistance: number;
  maxDistance: number;
}

// Helper function to find Greatest Common Divisor (GCD)
const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

const Controls: FC<ControlsProps> = ({ distance, intensity, physicalIntensity, onDistanceChange, minDistance, maxDistance }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDistanceChange(Number(event.target.value));
  };

  const renderFractionalCalculation = () => {
    const num = minDistance ** 2;
    // distance from slider is an integer
    const den = distance ** 2; 

    if (den === 0) return null; // Should not happen given minDistance constraint

    const commonDivisor = gcd(num, den);
    const simplifiedNum = num / commonDivisor;
    const simplifiedDen = den / commonDivisor;

    let fractionString = "";
    if (simplifiedNum === 0) {
      fractionString = "0";
    } else if (simplifiedDen === 1) {
      fractionString = `${simplifiedNum}`;
    } else {
      fractionString = `${simplifiedNum} / ${simplifiedDen}`;
    }

    return (
      <>
        <p className="pl-4">
          = <code className="text-xs px-1.5 py-0.5 bg-slate-800 rounded-md">{num} / {den}</code>
          { (num !== simplifiedNum || den !== simplifiedDen) && den !==0 && // Show simplified only if different or not just X/1 or 0
             (simplifiedDen === 1 ? ` = ${simplifiedNum}` : ` = ${fractionString}`)
          }
        </p>
        <p className="pl-4">
          ≈ <code className="text-xs px-1.5 py-0.5 bg-slate-800 rounded-md">{physicalIntensity.toFixed(3)}</code> (소수점 값)
        </p>
      </>
    );
  };


  return (
    <div className="p-4 md:p-6 bg-slate-700/50 rounded-lg shadow">
      <div className="mb-4">
        <label htmlFor="distance-slider" className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
          <Ruler className="w-5 h-5 mr-2 text-blue-400" />
          광원과의 거리 (cm): <span className="ml-2 font-bold text-blue-300">{distance.toFixed(0)} cm</span>
        </label>
        <input
          id="distance-slider"
          type="range"
          min={minDistance}
          max={maxDistance}
          value={distance}
          onChange={handleSliderChange}
          className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-valuemin={minDistance}
          aria-valuemax={maxDistance}
          aria-valuenow={distance}
          aria-label="광원과의 거리 조절 슬라이더"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{minDistance} cm</span>
          <span>{maxDistance} cm</span>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-slate-300">
          상대적 밝기 (이론값): <span className="font-bold text-yellow-300">{(physicalIntensity * 100).toFixed(1)}</span>
        </p>
        <div 
            className="w-full bg-slate-600 rounded-full h-2.5 mt-1 mb-3 overflow-hidden" 
            title={`이론적 밝기: ${(physicalIntensity * 100).toFixed(1)}`}
        >
          <div 
            className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${physicalIntensity * 100}%` }}
            role="progressbar"
            aria-valuenow={physicalIntensity * 100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="상대적 밝기 (이론값) 표시"
          ></div>
        </div>
      </div>

      <div className="text-sm mt-4 pt-4 border-t border-slate-600/80">
        <h4 className="font-semibold text-slate-100 mb-2">이론적 밝기 계산 (역제곱 법칙):</h4>
        <div className="space-y-1 text-slate-300">
          <p>
            공식: <code className="text-xs px-1.5 py-0.5 bg-slate-800 rounded-md">(최소 거리 / 현재 거리)²</code>
          </p>
          <p>
            현재 값: <code className="text-xs px-1.5 py-0.5 bg-slate-800 rounded-md">({minDistance}cm / {distance}cm)²</code>
          </p>
          {renderFractionalCalculation()}
        </div>
      </div>
    </div>
  );
};

export default Controls;
