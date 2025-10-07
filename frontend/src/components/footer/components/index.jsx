'use client';
import React from 'react';
import CmsLink from './cms-link';
import useFooter from '../hooks/useFooter';
import Faucet from '@/components/faucet/components';
import Image from 'next/image';
import { Facebook, Instagram, Tiktok, Twitter } from '@/components/socials';
import Link from 'next/link';

const Footer = () => {
  const { isGamePlay, t, handleClick, isOpen, handleOpenTerms } = useFooter();
  return (
    <div className="text-white space-y-2 mb-24 max-w-7xl mx-auto px-14 mt-14">
      <Image
        src={'/logo.png'}
        alt="logo"
        onClick={() => redirect('/')}
        width={80}
        height={80}
        className="cursor-pointer"
      />

      <p>@2025 Orion Star | All rights reserved.</p>

      <p>
        At Orion Star it is ALWAYS FREE to enter or win our Sweepstakes games.
        No Purchase Necessary. Void where prohibited by law. Find out more in
        our Sweepstakes Rules. Terms of Service apply.
      </p>

      {!isGamePlay && <CmsLink />}

      <h2 className="text-lg font-semibold mb-2 mt-4">Follow us</h2>
      <div className="flex gap-2">
        <Instagram />
        <Tiktok />
        <Facebook />
        <Twitter />
      </div>

      <hr className='!my-4' />

      <div className="flex flex-col md:flex-row flex-wrap">
        <p className='text-nowrap'>
          Online support 24/7 :{' '}
          <Link href={'mailto:support@dinerosweeps.com'} className="underline">
            support@dinerosweeps.com
          </Link>
        </p>
        <span className="border h-7 hidden md:block mx-3" />
        <p className='text-nowrap'>
          Business :{' '}
          <Link href={'mailto:support@dinerosweeps.com'} className="underline">
            support@dinerosweeps.com
          </Link>
        </p>
      </div>

      <p className="text-gray-500">
        US Payment Related Queries (24/7): <br />
        <Link href={'tel:+1(232)756-98765'} className="underline">
          +1 (232) 756-98765
        </Link>
      </p>

      {isOpen && <Faucet handleClick={handleClick} isOpen={isOpen} />}
    </div>
  );
};

export default Footer;
