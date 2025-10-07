'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { coins, usd } from '@/assets/svg';
import { CURRENCY } from './constant';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useCoinToggler from './hooks/useCoinToggler';
import useWalletSocket from './hooks/useWalletSocket';
import { formatAmount } from '@/lib/utils';
import { getAccessToken } from '@/services/storageUtils';
import { cn } from '@/lib/utils';

function CoinToggler({ setCurrency = () => {}, isPopupRequired = true }) {
  const {
    selectedCoin,
    hadleToggle,
    open,
    setOpen,
    getBalance = () => {},
  } = useCoinToggler(setCurrency, isPopupRequired);

  const [isMobile, setIsMobile] = useState(false);

  // Get token from user context or storage
  const token = getAccessToken();

  // Use wallet socket hook to listen for wallet balance updates
  useWalletSocket(token);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 600);
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  return (
    <div className="w-[98%] sm:w-full mx-auto grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className="!bg-transparent hover:bg-transparent focus:outline-none focus:ring-0"
          {...(isMobile
            ? { onClick: () => setOpen((prev) => !prev) }
            : {
                onPointerEnter: () => setOpen(true),
                onPointerLeave: () => setOpen(false),
              })}
          style={{
            '--secondary-btn-color': '78, 43, 111',
          }}
        >
          <ToggleGroup
            type="single"
            value={selectedCoin}
            onValueChange={(value) => hadleToggle(value)}
            className="flex items-center mb-2 justify-center w-full transition-all duration-300 ease-in-out"
          >
            {CURRENCY.map((currency) => (
              <ToggleGroupItem
                key={currency.value}
                value={currency.value}
                className={cn(
                  'w-1/2 p-0 bg-transparent data-[state=on]:bg-transparent hover:bg-transparent items-center text-white transition-all duration-300 ease-in-out relative'
                )}
              >
                <div className='flex font-bold gap-0.5 z-10'>
                  <Image
                    src={currency.icon}
                    width={16}
                    height={16}
                    alt="CURRENCY"
                    className="transition-transform duration-300 ease-in-out h-4 w-4 sm:h-5 sm:w-5"
                  />
                  <span className="text-xs sm:text-sm">
                    {formatAmount(
                      currency.label === 'SC'
                        ? parseFloat(getBalance('PSC')) +
                            parseFloat(getBalance('BSC')) +
                            parseFloat(getBalance('RSC'))
                        : getBalance(currency.label)
                    )}{' '}
                    {currency.label}
                  </span>
                </div>
                {currency.value === selectedCoin && (
                  <span className="w-full h-full absolute top-0 left-0 bg-blue-900 rounded-full"></span>
                )}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </PopoverTrigger>

        {isPopupRequired && (
          <PopoverContent
            side={isMobile ? 'up' : 'right'}
            className={`w-[21rem] text-white border-0 rounded-lg p-2 shadow-lg focus:outline-none focus:ring-0 bg-new-primary`}
            {...(isMobile
              ? { onClick: () => setOpen(false) }
              : {
                  onMouseEnter: () => setOpen(true),
                  onMouseLeave: () => setOpen(false),
                })}
          >
            <div className="space-y-2">
              <div className="text-center">
                <span className="text-[0.9rem] font-semibold">
                  Your Gold Coins Balance
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Image src={coins} alt="Gold Coin" className="w-4 h-4" />
                  <span className="text-[0.9rem]">
                    {`${formatAmount(parseFloat(getBalance('GC')))} GC`}
                  </span>
                </span>
              </div>

              <hr className="border-gray-600" />

              <div className="text-center">
                <span className="text-[0.9rem] font-semibold">
                  Your Sweepstake Cash Balance
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Image src={usd} alt="Sweepstake Cash" className="w-4 h-4" />
                  <span className="text-[0.9rem]">
                    {`${formatAmount(
                      parseFloat(getBalance('PSC')) +
                        parseFloat(getBalance('BSC'))
                    )} SC`}
                  </span>
                </span>
              </div>

              <hr className="border-gray-600" />

              <div className="text-center">
                <span className="text-[0.9rem] font-semibold">
                  Your Redeemable Sweepstake Cash
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Image src={usd} alt="Sweepstake Cash" className="w-4 h-4" />
                  <span className="text-[0.9rem]">
                    {`${formatAmount(getBalance('RSC'))} SC`}
                  </span>
                </span>
              </div>

              <hr className="border-gray-600" />

              <p className="text-xs text-center text-gray-300 mt-2">
                All Sweepstake Cash must be played at least once to become
                redeemable. For every SC 10 redeemed, you will receive $10.
              </p>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}

export default CoinToggler;
