'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/services/storageUtils';
import Footer from '@/components/footer/components';
import Casino from './Casino';
import { claimBonus, welcome } from '@/assets/png';
import InfiniteCarousel from './Provider';

const StartPage = () => {
  const router = useRouter();
  const playButtonClick = (type) => {
    const token = !!getAccessToken();
    if (token) {
      router.push('/');
    } else {
      if (type === 'play') {
        router.push('/login');
      } else if (type === 'bonus') {
        router.push('/setting?active=bonusDrop');
      } else if (type === 'signup') {
        router.push('/signup');
      } else {
        router.push('/casino');
      }
    }
  };

  return (
    <div className="my-24 w-full h-fit space-y-5">
      <div className="mx-auto w-fit flex flex-col items-center">
        <Image
          src={welcome}
          alt="welcome"
          width={500}
          height={500}
          className="w-72 h-72 md:w-96 md:h-96 -mb-7 z-10 cursor-pointer"
          onClick={() => playButtonClick('play')}
        />
        <button
          className="flex-1 font-bold rounded-full bg-red-500 py-2 hover:bg-red-700 transition-colors px-5"
          onClick={() => playButtonClick('play')}
        >
          Play Now
        </button>
      </div>
      <div className="py-14">
        <InfiniteCarousel />
      </div>
      <div className="w-full text-center">
        <span className="text-lg">
          Win with Orion Star Sweeps on over 2,000 exciting
        </span>
        <h1 className="text-5xl font-bold mb-10">Social Casino Games</h1>
        <Casino />
      </div>
      <div className="mx-auto w-fit flex flex-col items-center">
        <button
          className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors px-5 mb-10"
          onClick={() => playButtonClick('signup')}
        >
          Signup to play for free
        </button>

        <Image
          src={claimBonus}
          alt="welcome bonus"
          width={500}
          height={500}
          className="w-72 h-72 md:w-96 md:h-96 -mb-7 z-10 cursor-pointer"
          onClick={() => playButtonClick('bonus')}
        />
        <button
          className="flex-1 font-bold rounded-full bg-red-500 py-2 hover:bg-red-700 transition-colors px-5"
          onClick={() => playButtonClick('bonus')}
        >
          Play Now
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default StartPage;
