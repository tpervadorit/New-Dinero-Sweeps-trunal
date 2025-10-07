"use client";

import CustomListSkeleton from '@/common/components/custom-list-skeleton';
import { getAccessToken } from '@/services/storageUtils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BetsTable = dynamic(
  () => import('@/common/components/bets-table/components'),
  {
    ssr: false,
    loading: () => <CustomListSkeleton />,
  }
);

const BetsWrapper = ({ children }) => {
  const token = getAccessToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [token]);

  return (
    <div>
      {children}
      <div className="mt-5 hidden md:block">{isClient && <BetsTable />}</div>
    </div>
  );
};

export default BetsWrapper;
