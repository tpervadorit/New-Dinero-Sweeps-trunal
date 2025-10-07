'use client';
import { Skeleton } from '@/components/ui/skeleton';
import PromotionBanner from './promotion-banner';
import style from './style.module.scss';
import BonusCard from './bonus-cards';
import PromotionCard from './promotion-card';
import useBonus from '../hooks/useBonus';
import usePromotionCard from '../hooks/usePromotionCard';
import BetsWrapper from '@/layout/BetsWrapper';
import ConfirmBuyPopupWrapper from '@/components/Stores/component/ConfirmBuyPopupWrapper';
import { usd } from '@/assets/svg';
import Image from 'next/image';
import useBuy from '@/components/Buy-Reedem/hooks/useBuy';
import CustomCardSkeleton from '@/common/components/custom-card-skeleton';

const Promotions = () => {
  const { bonusData, loading, flippedCards, handleFlip, rightPanel } =
    useBonus();
  const { buyPacakageData, buyPacakageLoading, t, router, isKycVerified } =
    useBuy();

  const gridClass = rightPanel ? style.threeColumns : style.twoColumns;
  const {
    promoCardsData,
    promoCardsLoading,
    promoFlippedCards,
    handlePromoFlip,
  } = usePromotionCard();

  const renderLoading = () => {
    const columnCount = rightPanel ? 4 : 2;
    return (
      <div className={`${gridClass} ${style.cardsView}`}>
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <Skeleton
              key={idx}
              className={`w-full ${
                columnCount === 4 ? 'h-[250px]' : 'h-[300px]'
              } bg-[rgb(var(--lb-blue-300))] rounded-lg`}
            />
          ))}
      </div>
    );
  };

  const renderBuyLoading = () => {
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
          <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
            Buy Gold Coin Packages!
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 scrollable-Content scrollable-Content-new mb-8">
          {buyPacakageLoading
            ? renderBuyLoading()
            : buyPacakageData?.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex flex-col items-center justify-between bg-neutral-800 text-white rounded-2xl overflow-hidden bg-gradient-to-b from-yellow-400 to-pink-500 p-0.5 hover:shadow-bonus hover:to-yellow-400 transition-all"
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
                          <span className="text-sm">Free SC {item.scCoin}</span>
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

        <h1 className="text-white text-2xl font-bold mb-6">Promotions</h1>
        <PromotionBanner />

        {loading ? (
          renderLoading()
        ) : (
          <div className={`w-full overflow-x-auto ${style.scrollbarcontainer}`}>
            <div
              // className="flex w-max gap-5 "
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-10`}
            >
              {bonusData.map((bonus) => (
                <BonusCard
                  key={bonus.id}
                  bonus={bonus}
                  flippedCard={flippedCards.includes(bonus.id)}
                  handleFlip={handleFlip}
                  className="flex-shrink-0"
                />
              ))}
            </div>
          </div>
        )}
        {promoCardsLoading ? (
          renderLoading()
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${rightPanel ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} ${rightPanel ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}  gap-6 w-full mt-10`}
          >
            {promoCardsData.map((promo) => (
              <PromotionCard
                key={promo.id}
                promotion={promo}
                promoFlippedCard={promoFlippedCards?.includes(promo.id)}
                handlePromoFlip={handlePromoFlip}
              />
            ))}
          </div>
        )}
      </div>
    </BetsWrapper>
  );
};

export default Promotions;
