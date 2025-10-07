import {
  ArrowLeft,
  ArrowRight,
  CheckIcon,
  LockKeyholeIcon,
} from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Card({ tier }) {
  // Simulated bonus unlock logic based on level (customize this as needed)
  const bonuses = [
    { label: 'Login Bonus', unlocked: true },
    { label: 'Daily Bonus', unlocked: tier.level > 1 },
    { label: 'Weekly Bonus', unlocked: true },
    { label: 'Monthly Bonus', unlocked: tier.level > 2 },
    { label: 'Welcome Bonus', unlocked: true },
    { label: 'Cash Back', unlocked: tier.level > 1 },
    { label: 'Level Up Bonus', unlocked: true },
  ];

  return (
    <div className="bg-gradient-to-b from-red-900 to-black p-4 rounded-2xl shadow-lg text-white w-[280px] shrink-0 mx-2">
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={tier.icon}
          alt={tier.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className="text-sm bg-gray-700 px-2 py-0.5 rounded-full">
          {tier.name}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Wager Amount</span>
          <span className="text-green-400 font-semibold">
            {tier.wageringThreshold} SC
          </span>
        </div>
        <div className="flex justify-between">
          <span>Rakeback</span>
          <span className="text-green-400 font-semibold">
            {tier.level * 5}%
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {bonuses.map((bonus) => (
          <li key={bonus.label} className="flex justify-between items-center">
            <span>{bonus.label}</span>
            {bonus.unlocked ? (
              <CheckIcon className="text-green-400 w-4 h-4" />
            ) : (
              <LockKeyholeIcon className="text-gray-400 w-4 h-4" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VIPRulesSlider({ tiers }) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024)
        setCardsPerView(3); // Desktop
      else if (width >= 768)
        setCardsPerView(2); // Tablet
      else setCardsPerView(1); // Mobile
    };

    updateCardsPerView(); // Initial run
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const visibleCards = tiers.slice(startIndex, startIndex + cardsPerView);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + cardsPerView < tiers.length;

  const scrollLeft = () => {
    if (canScrollLeft) setStartIndex(startIndex - 1);
  };

  const scrollRight = () => {
    if (canScrollRight) setStartIndex(startIndex + 1);
  };

  return (
    <div className="relative w-full max-w-6xl flex items-center">
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`absolute -left-5 z-10 p-3 bg-gray-800 rounded-full text-white disabled:opacity-30`}
      >
        <ArrowLeft />
      </button>

      <div className="flex justify-center w-full overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out">
          {visibleCards.map((tier) => (
            <Card key={tier.vipTierId} tier={tier} />
          ))}
        </div>
      </div>

      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`absolute -right-5 z-10 p-3 bg-gray-800 rounded-full text-white disabled:opacity-30`}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

const VIPRules = ({ tiers }) => (
  <div className="text-white flex flex-col items-center p-6 space-y-6">
    <h1 className="text-3xl font-bold">VIP Rules</h1>
    <VIPRulesSlider tiers={tiers} />
  </div>
);

export default VIPRules;
