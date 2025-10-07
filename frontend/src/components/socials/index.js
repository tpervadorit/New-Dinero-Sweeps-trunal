import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  facebookSidebar,
  instagramSidebar,
  tiktokSidebar,
  twitterSidebar,
} from '@/assets/png';

export const Facebook = () => {
  return (
    <Link href={'https://www.facebook.com/'}>
      <Image src={facebookSidebar} alt="facebook" />
    </Link>
  );
};
export const Instagram = () => {
  return (
    <Link href={'https://www.instagram.com/'}>
      <Image src={instagramSidebar} alt="instagram" />
    </Link>
  );
};
export const Twitter = () => {
  return (
    <Link href={'https://x.com/'}>
      <Image src={twitterSidebar} alt="twitter" />
    </Link>
  );
};
export const Tiktok = () => {
  return (
    <Link href={'https://www.tiktok.com/'}>
      <Image src={tiktokSidebar} alt="tiktok" />
    </Link>
  );
};
