import { Loading } from '@/assets/png';
import Image from 'next/image';
import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <Image src={Loading} alt="Loading" width={300} height={300} />
    </div>
  );
};

export default PageLoader;
