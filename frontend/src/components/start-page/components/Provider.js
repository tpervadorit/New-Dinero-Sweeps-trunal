'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { slots } from '@/assets/svg';
import useProvider from '../hooks/useProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Providers } from '../constants';

export default function InfiniteCarousel() {
  const { providerLoading, providerOptions: data } = useProvider();
  const [current, setCurrent] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5); // default desktop
  const [length, setLength] = useState(
    Math.max(1, data.length - visibleItems + 1)
  );
  const timeoutRef = useRef(null);

  // Function to decide how many items are visible based on screen
  const calculateVisibleItems = () => {
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 768) return 3; // Small tablet
    if (window.innerWidth < 1280) return 5; // Large tablet
    return 7; // Desktop
  };

  // Update carousel when screen size OR data changes
  const updateCarouselSettings = () => {
    const newVisible = calculateVisibleItems();
    setVisibleItems(newVisible);
    setLength(Math.max(1, data.length - newVisible + 1));
    setCurrent(0); // reset index when data changes
  };

  // Handle resize
  useEffect(() => {
    updateCarouselSettings();
    window.addEventListener('resize', updateCarouselSettings);
    return () => window.removeEventListener('resize', updateCarouselSettings);
  }, [data]);

  // Autoplay
  const resetAutoPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (data.length <= visibleItems) return; // no autoplay if not scrollable

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 2500);
  };

  const nextSlide = () => {
    if (data.length <= visibleItems) return;
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    if (data.length <= visibleItems) return;
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [current, visibleItems, data]);

  return (
    <div>
      {data?.length > 0 ? (
        <div className="w-full relative px-10">
          <div className="relative w-full overflow-hidden">
            {/* Slider track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(current * 100) / visibleItems}%)`,
              }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center px-2"
                  style={{ minWidth: `${100 / visibleItems}%` }}
                >
                  <div
                    className="rounded-xl text-white font-bold text-center w-full min-h-10 h-full flex items-center justify-center gap-3 px-5"
                    style={{ backgroundColor: item.color }}
                  >
                    <Image
                      src={slots}
                      width={20}
                      height={20}
                      alt="provider"
                      className=""
                    />
                    <span className="text-nowrap truncate">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Button */}
          <button
            onClick={prevSlide}
            disabled={data.length <= visibleItems}
            className="absolute left-0 top-0 min-h-10 bg-neutral-700 hover:bg-neutral-500 text-white p-2 rounded-full rounded-e-none"
          >
            <ArrowLeft />
          </button>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            disabled={data.length <= visibleItems}
            className="absolute right-0 top-0 min-h-10 bg-neutral-700 hover:bg-neutral-500 text-white p-2 rounded-full rounded-s-none"
          >
            <ArrowRight />
          </button>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
