'use client';

import BetsWrapper from '@/layout/BetsWrapper';
import style from './style.module.scss';
import { t } from 'i18next';
import { coins, usd } from '@/assets/svg';
import Image from 'next/image';
import CustomCardSkeleton from '@/common/components/custom-card-skeleton';
import ConfirmBuyPopupWrapper from '@/components/Stores/component/ConfirmBuyPopupWrapper';
import useBuy from '@/components/Buy-Reedem/hooks/useBuy';
import { ChevronLeft } from 'lucide-react';

const Stores = () => {
  const { buyPacakageData, buyPacakageLoading, t, router, isKycVerified } =
    useBuy();
  const onClose = () => {
    router.push('/');
  };

  const renderLoading = () => {
    return (
      <>
        <CustomCardSkeleton rows={4} className="my-2 max-h-20" />
      </>
    );
  };

  return (
    <BetsWrapper>
      <div
        className={`${style.wrapCenter} bg-[hsl(var(--new-background))] p-6`}
      >
        <div className="flex gap-3 items-center mb-8">
          <div className="text-white cursor-pointer" onClick={onClose}>
            <ChevronLeft />
          </div>
          <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
            Buy Gold Coin Packages!
          </div>
        </div>
        <div className="w-full mx-auto">
          <div className="flex flex-wrap gap-2 scrollable-Content scrollable-Content-new mb-8">
            {buyPacakageLoading
              ? renderLoading()
              : buyPacakageData?.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-52 w-52 flex flex-col items-center justify-between bg-neutral-800 text-white rounded-2xl overflow-hidden bg-gradient-to-b from-yellow-400 to-pink-500 p-0.5 hover:shadow-bonus hover:to-yellow-400 transition-all"
                  >
                    <div
                      key={item.id}
                      className="w-full flex flex-col items-center justify-between bg-neutral-800 text-white rounded-2xl overflow-hidden"
                    >
                      <div className="text-black font-bold text-center text-2xl m-0 p-0 bg-yellow-500 w-full py-2 truncate">
                        {item?.label}
                      </div>
                      <div className="w-full flex flex-col gap-2.5 items-center p-3">
                        <div className="text-white font-bold text-center text-2xl m-0 p-0 flex flex-col">
                          <span>{item.gcCoin}</span>
                          <span className="text-sm">Gold Coin</span>
                        </div>
                        <div className="w-full border-2 border-yellow-600 rounded-2xl overflow-hidden text-center">
                          <div className="w-full m-0 bg-green-500 text-black font-medium text-xs flex items-center justify-center text-center gap-2 p-1">
                            <Image
                              src={usd}
                              alt="usd image"
                              className="w-4 h-4"
                            />
                            <span className="text-sm">
                              Free SC {item.scCoin}
                            </span>
                          </div>
                          <div className="w-full m-0 text-xs flex items-center justify-center gap-2 p-1">
                            <span className="text-sm">Live Chat access</span>
                          </div>
                        </div>
                        <div className="w-full rounded-xl overflow-hidden">
                          <ConfirmBuyPopupWrapper item={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between text-white text-lg">
          <h3>Gold coin Packages!</h3>
          <h3>Free Add-ons</h3>
        </div>
        {buyPacakageLoading ? (
          renderLoading()
        ) : (
          <>
            <div className="scrollable-Content scrollable-Content-new">
              {buyPacakageData?.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex gap-2.5 items-center justify-between m-2 bg-neutral-800 text-white rounded-md px-5 py-3"
                >
                  <div className="w-full flex gap-2.5 items-center">
                    <Image
                      src={coins}
                      alt={item?.label}
                      width={40}
                      height={40}
                      className="h-8 w-8"
                    />
                    <p className="text-white font-bold text-center text-sm m-0 p-0">
                      GC {item.gcCoin}
                    </p>
                    <div className="m-0 bg-green-900 text-green-400 rounded-lg font-bold flex gap-2 p-1.5 pr-2.5">
                      <span className="text-sm">+ Free SC {item.scCoin}</span>
                      <Image
                        src={usd}
                        alt="usd image"
                        className="w-5 h-5 hidden md:block"
                      />
                    </div>
                  </div>
                  <div className="ml-auto">
                    <ConfirmBuyPopupWrapper item={item} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="text-gray-400 text-sm md:text-base mx-3 pt-4">
          At Orion Star it is ALWAYS FREE to enter or win our Sweepstakes games.
          No Purchase Necessary. Void where prohibited by law. Find out more in
          our Sweepstakes Rules. Terms of Service apply.
        </p>
      </div>
    </BetsWrapper>
  );
};

export default Stores;
