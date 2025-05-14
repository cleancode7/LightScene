
import React, { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import LightScene from './LightScene';
import Controls from './Controls';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const MIN_DISTANCE = 10; // cm
const MAX_DISTANCE = 200; // cm

// 기준 색상 정의
const DIM_COLOR_RGB = { r: 55, g: 65, b: 81 }; // bg-slate-700 좀 더 어둡게
export const LIT_COLOR_RGB = { r: 253, g: 224, b: 71 }; // bg-yellow-400

const funFactsData = [
  {
    title: "가장 빠른 속도!",
    fact: "빛은 우주에서 가장 빠른 존재예요! 1초에 약 30만 킬로미터를 이동하는데, 이건 지구를 7바퀴 반이나 돌 수 있는 엄청난 속도랍니다!",
    source: "우리가 보는 별빛은 아주 먼 옛날에 출발한 빛이라는 사실, 알고 계셨나요?"
  },
  {
    title: "별빛의 비밀!",
    fact: "밤하늘의 별은 사실 다양한 색깔을 가지고 있어요. 별의 표면 온도에 따라 파란색, 흰색, 노란색, 붉은색 등으로 보인답니다. 뜨거울수록 파란색에 가까워요!",
    source: "태양은 노란색 별에 속해요."
  },
  {
    title: "그림자의 원리!",
    fact: "그림자는 빛이 물체에 막혀 통과하지 못할 때 생기는 어두운 영역이에요. 광원이 여러 개이거나 넓으면 그림자 가장자리가 흐릿해질 수 있어요.",
    source: "손전등 하나로 그림자놀이를 해보세요!"
  },
  {
    title: "무지개의 마법!",
    fact: "무지개는 햇빛이 공기 중의 물방울을 통과하면서 굴절되고 반사되어 만들어지는 아름다운 현상이에요. 항상 태양의 반대편에 나타난답니다.",
    source: "비 온 뒤 맑은 날, 무지개를 찾아보세요!"
  },
  {
    title: "빛과 식물!",
    fact: "식물은 햇빛을 이용해 광합성을 하고 스스로 양분을 만들어요. 빛이 없으면 식물은 자랄 수 없답니다.",
    source: "햇빛은 식물에게 정말 중요해요!"
  }
];

const App: FC = () => {
  const [distance, setDistance] = useState<number>((MIN_DISTANCE + MAX_DISTANCE) / 2);
  const [currentFunFact, setCurrentFunFact] = useState(funFactsData[0]);

  useEffect(() => {
    if (funFactsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * funFactsData.length);
      setCurrentFunFact(funFactsData[randomIndex]);
    }
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  const physicalIntensity = useMemo(() => {
    if (distance === 0) return 0;
    const intensity = (MIN_DISTANCE / distance) ** 2;
    return Math.min(Math.max(intensity, 0), 1); 
  }, [distance]);

  const perceivedIntensity = useMemo(() => {
    const exponent = 0.5; 
    return Math.pow(physicalIntensity, exponent);
  }, [physicalIntensity]);

  const surfaceColor = useMemo(() => {
    const r = DIM_COLOR_RGB.r * (1 - perceivedIntensity) + LIT_COLOR_RGB.r * perceivedIntensity;
    const g = DIM_COLOR_RGB.g * (1 - perceivedIntensity) + LIT_COLOR_RGB.g * perceivedIntensity;
    const b = DIM_COLOR_RGB.b * (1 - perceivedIntensity) + LIT_COLOR_RGB.b * perceivedIntensity;
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }, [perceivedIntensity]);

  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-yellow-400 selection:text-slate-900">
      <Header title="✨ 빛의 세기 시뮬레이터 ✨" />
      <main className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 my-8">
        <p className="text-center text-slate-300 mb-6 text-lg">
          광원으로부터의 거리에 따라 빛의 밝기가 어떻게 변하는지 관찰해보세요.
        </p>
        
        <LightScene
          distance={distance}
          intensity={perceivedIntensity} 
          surfaceColor={surfaceColor}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
        />
        
        <Controls
          distance={distance}
          intensity={perceivedIntensity} 
          physicalIntensity={physicalIntensity} 
          onDistanceChange={handleDistanceChange}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
        />
        
        <div className="mt-8 p-4 bg-slate-700 rounded-lg text-sm text-slate-300">
          <h3 className="font-semibold text-slate-100 mb-2">실험 원리 (역제곱 법칙):</h3>
          <p>
            점 광원에서 나오는 빛의 세기는 광원으로부터의 거리의 제곱에 반비례합니다. 
            즉, 거리가 2배 멀어지면 빛의 세기는 1/4로 줄어들고, 거리가 3배 멀어지면 1/9로 줄어듭니다.
            이 시뮬레이션에서는 최소 거리({MIN_DISTANCE}cm)에서의 밝기를 기준으로 상대적인 밝기 변화를 보여줍니다.
          </p>
          <p className="mt-2">
            물리적 상대 밝기 ≈ (최소 거리 / 현재 거리)²
          </p>
          <p className="mt-1 text-xs text-slate-400">
            (참고: 화면의 시각적 효과(예: 관찰 눈의 밝기, 광선)는 물리적 밝기를 기반으로 시각적 인지를 돕기 위해 조정된 값을 사용합니다. 상단에 표시되는 '상대적 밝기 (이론값)'은 물리 법칙에 따른 계산값입니다.)
          </p>
        </div>

        {currentFunFact && (
          <div className="mt-6 p-4 bg-gradient-to-r from-sky-700 to-cyan-700 rounded-lg text-sm text-sky-100 shadow-md">
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-yellow-300"><path d="M12 2.69l.346.666L12.982 4l.672.333L14 4.999l.333.672L14.999 6l.672-.333L16 5.333l.333-.672L16.999 4l.672.333L18 4.999l.333.672L18.999 6l.672-.333L20 5.333l.333-.672L20.999 4l.346-.666L21.308 2H2.692l.346.69L3.692 4l.672.333L4.999 5l.333.672L5.999 6l.672-.333L7 5.333l.333-.672L7.999 4l.672.333L9 4.999l.333.672L9.999 6l.672-.333L11 5.333l.333-.672L11.999 4z"></path><path d="M12 12.999L9.83 15.17l-2.83-2.83L12 17.001l5-5-2.83-2.828L12 12.999z"></path><line x1="12" y1="22" x2="12" y2="17"></line></svg>
              ⭐ {currentFunFact.title}
            </h3>
            <p>
              {currentFunFact.fact}
            </p>
            <p className="mt-1 text-xs text-sky-200/80">
              {currentFunFact.source}
            </p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default App;
