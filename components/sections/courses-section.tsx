"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Inglês para Viagem",
    description: "Prepare-se para aeroportos, hotéis e passeios.",
    image: "/images/trilhas/travel.png"
  },
  {
    id: 2,
    title: "Inglês Tecnológico",
    description: "Inglês para TI, mercado digital e reuniões online.",
    image: "/images/trilhas/tech.png"
  },
  {
    id: 3,
    title: "Inglês para Conversação",
    description: "Fale com mais confiança e naturalidade no dia a dia.",
    image: "/images/trilhas/conversation.png"
  },
  {
    id: 4,
    title: "Inglês Básico",
    description: "Comece do zero e construa uma base sólida.",
    image: "/images/trilhas/basic.png"
  },
  {
    id: 5,
    title: "Inglês Intermediário",
    description: "Expanda seu vocabulário e desenvolva fluência.",
    image: "/images/trilhas/intermediate.png"
  },
  {
    id: 6,
    title: "Inglês Avançado",
    description: "Domine estruturas complexas e alcance nível profissional.",
    image: "/images/trilhas/advanced.png"
  }
];

export function CoursesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    if (autoPlay) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoPlay, resetTimeout]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  return (
    <section id="cursos" className="relative h-[600px] lg:h-[700px] w-full overflow-hidden bg-black">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isActive
              ? "opacity-100 translate-x-0 z-10"
              : "opacity-0 -translate-x-12 z-0 pointer-events-none"
              }`}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Overlay Text */}
            <div className="absolute bottom-32 left-8 md:bottom-40 md:left-16 xl:left-24 max-w-3xl px-4">
              <h2
                className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 transition-all duration-1000 delay-300 transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{
                  textShadow: "0 4px 24px rgba(0,0,0,0.5)"
                }}
              >
                {slide.title}
              </h2>
              <p
                className={`text-xl sm:text-2xl md:text-3xl text-[#e2e8f0] font-medium transition-all duration-1000 delay-500 transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                style={{
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)"
                }}
              >
                {slide.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Ir para slide ${index + 1}`}
            className={`transition-all duration-500 rounded-full h-3 ${index === currentIndex
              ? "w-10 bg-[var(--brand-blue)] shadow-[0_0_16px_rgba(56,96,214,0.9)]"
              : "w-3 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
