import { headPortrait, vipClub } from '@/assets/png';
import Image from 'next/image';
import React from 'react';
import useVip from '@/components/vip-page/hooks/useVip';
import CustomCircularloading from '@/common/components/custom-circular-loading';
import { Progress } from '@/components/ui/progress';
import {
  AvatarFallback,
  Avatar as AvatarIcon,
  AvatarImage,
} from '@/components/ui/avatar';
import { formatAmount } from '@/lib/utils';
import VIPRules from './VIPRules';

const ProgressSection = () => {
  const { overallProgress, loading, user, tiers } = useVip();
  const {
    firstName,
    lastName,
    profileImage,
    nextVipTier,
    currentVipTier,
    userWallet,
  } = user || {
    firstName: '',
    lastName: '',
    profileImage: null,
    nextVipTier: {},
    currentVipTier: {},
    userWallet: [],
  };

  const getBalance = (code) => {
    const data = userWallet?.find((data) => data?.currencyCode === code);
    return data?.balance || '0.0000';
  };

  if (loading) return <CustomCircularloading />;
  return (
    <div className="text-white w-full">
      <Image
        src={vipClub}
        alt="vip club"
        className="mx-auto -mb-2"
        width={300}
        height={300}
      />
      <div className="grid grid-cols-8 md:grid-rows-2 gap-3">
        <div className="col-span-8 md:col-span-5 xl:col-span-6 md:row-span-2 bg-stone-800 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">
            Hey, {firstName ?? ''} {lastName ?? ''}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-fit h-fit rounded-full">
              <AvatarIcon className="h-fit w-fit">
                <AvatarImage
                  src={profileImage}
                  alt="avatar"
                  className="w-14 h-14"
                />
                <AvatarFallback>
                  <Image
                    src={headPortrait}
                    alt="profile fallback"
                    width={60}
                    height={60}
                  />
                </AvatarFallback>
              </AvatarIcon>
            </div>
            <div className="font-medium text-base">
              <p>
                Current Level:{' '}
                <span className="text-yellow-500">
                  Level {currentVipTier?.level ?? 'N/A'}
                </span>
              </p>
              <p>
                Wager{' '}
                <span className="text-green-500">
                  {nextVipTier?.wageringThreshold ?? 'N/A'}
                </span>{' '}
                to reach Level {nextVipTier?.level ?? 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center text-sm gap-2 font-bold text-gray-200">
            <Progress
              value={overallProgress}
              className="w-full bg-[var(--progress-bar)] rounded-full"
            />
            {overallProgress}%
          </div>
        </div>
        <div className="col-span-8 sm:col-span-4 md:col-span-3 xl:col-span-2 bg-stone-800 rounded-lg p-4 md:p-2 text-center">
          <span>Amount waggered in 30 days</span>
          <h1 className="font-bold text-2xl text-green-500">
            {formatAmount(
              parseFloat(getBalance('PSC')) +
                parseFloat(getBalance('BSC')) +
                parseFloat(getBalance('RSC'))
            )}{' '}
            SC
          </h1>
        </div>
        <div className="col-span-8 sm:col-span-4 md:col-span-3 xl:col-span-2 bg-stone-800 rounded-lg p-4 md:p-2 text-center">
          <span>Amount waggered Lifetime</span>
          <h1 className="font-bold text-2xl text-green-500">0 SC</h1>
        </div>
      </div>
      <VIPRules tiers={tiers} />
    </div>
  );
};

export default ProgressSection;
