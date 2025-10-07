'use client';

import HomeCustomCardSkeleton from '@/common/components/home-custom-card-skeleton';
import { isEmpty } from '@/lib/utils';
import { getAccessToken } from '@/services/storageUtils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useHome from '../hooks/useHome';
import Banner from './banner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import CustomTableSkeleton from '@/common/components/custom-table-skeleton';

const CasinoSection = dynamic(() => import('./CasinoSection'), {
  ssr: false,
  // loading: () => <HomeCustomCardSkeleton rows={8} />,
  // loading: () => <HomeCustomCardSkeleton rows={8} titled />
});

// Dynamically load BetsTable for better performance
const BetsTable = dynamic(
  () => import('@/common/components/bets-table/components'),
  {
    ssr: false,
    loading: () => <CustomTableSkeleton rows={5} columns={7} />,
  }
);

const RecentBigWin = dynamic(
  () => import('@/components/Home/components/recent-big-win'),
  {
    ssr: false,
    loading: () => (
      <HomeCustomCardSkeleton
        className="w-[89px] h-[89px] md:w-[99px] md:h-[99px]"
        rows={9}
      />
    ),
  }
);

function HomePage() {
  const { gameData, gameLoading, setSearch } = useHome();
  const token = getAccessToken();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const handleSearchSubmit = (data) => {
    setSearch(data?.search);
  };

  useEffect(() => {
    setIsClient(true);
  }, [token]);

  return (
    <div className="flex w-full flex-none flex-col bg-[hsl(var(--new-background))]">
      {!isMobile && (
        <header className="w-full my-5 flex items-center justify-between">
          <form onSubmit={handleSubmit(handleSearchSubmit)} className="my-5">
            <Controller
              control={control}
              name="search"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="search"
                    placeholder="Search Games and Game Providers"
                    className={`bg-neutral-800 w-fit min-w-[19rem]`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setSearch(e.target.value);
                    }}
                  />
                );
              }}
            />
          </form>
          <Button
            className="bg-red-500 py-2 text-white rounded-full hover:bg-red-600"
            onClick={() => redirect('/stores')}
          >
            Get Coins
          </Button>
        </header>
      )}

      <Banner />

      {gameLoading && (
        <>
          <HomeCustomCardSkeleton rows={8} titled />
          <HomeCustomCardSkeleton rows={8} titled />
          <HomeCustomCardSkeleton rows={8} titled />
        </>
      )}

      {gameData?.map(
        (game) =>
          !isEmpty(game?.CasinoGames) &&
          game?.CasinoGames?.length > 7 && (
            <section key={game?.id} className="casino-section">
              <CasinoSection
                categoryId={game?.id}
                categoryName={game?.name?.EN}
                casinoGames={game?.CasinoGames}
              />
            </section>
          )
      )}
      <div className="mt-5 hidden md:block">{isClient && <BetsTable />}</div>
      <div className="my-3">
        <RecentBigWin />
      </div>
    </div>
  );
}

export default HomePage;
