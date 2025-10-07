import React from 'react';
import Image from 'next/image';
import useCasino from '../hooks/useCasino';
import { isEmpty } from '@/lib/utils';
import CustomNoDataFound from '@/common/components/custom-noData';

const Casino = () => {
  const {
    formateData,
    gameLoading,
  } = useCasino();
  
  return (
    <div className="my-5 mb-10 mx-auto lg:max-w-3xl xl:max-w-6xl">
      {isEmpty(formateData) && !gameLoading ? (
        <CustomNoDataFound />
      ) : (
        <div className="overflow-hidden mx-auto w-[100%] ">
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 mt-3 mx-auto`}
          >
            {formateData?.map((game) => (
              <div
                key={`${game?.casinoGameId}-${game?.id}`}
                className="flex-auto w-auto h-auto "
              >
                <div className='aspect-square rounded-xl overflow-hidden bg-neutral-800'>
                  <Image src={game?.thumbnailUrl} alt={game?.id} width={10000} height={10000} className='object-cover' />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Casino;
