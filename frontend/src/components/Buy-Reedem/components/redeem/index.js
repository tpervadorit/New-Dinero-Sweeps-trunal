'use client';

import { useState } from 'react';
import Redeem from './redeembutton';
import { Button } from '@/components/ui/button';
import FiatCrypto from './fiatButton';
import { warningIcon } from '@/assets/svg';
import useReedem from '../../hooks/useReedem';
import Image from 'next/image';

export default function RedeemMain({ handleCloseDialog }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const { t, router, isEmailVerified } = useReedem();

  return (
    <>
      {isEmailVerified && (
        <div className="my-4 rounded-2xl bg-stone-700 text-white text-center p-3 font-semibold">
          <p className="text-2xl flex justify-center items-center">
            <Image src={warningIcon} alt="warning icon" className="mx-2" />
            {t('warning')}:
          </p>
          <p className="my-2">
            {t('redeemAfter')}&nbsp;
            <span
              className="underline cursor-pointer"
              onClick={() => {
                router.push('/setting?active=email');
                handleCloseDialog();
              }}
            >
              {t('settingEmail')}.
            </span>
          </p>
        </div>
      )}

      {isEmailVerified && <Redeem handleCloseDialog={handleCloseDialog} />}
    </>
  );
}
