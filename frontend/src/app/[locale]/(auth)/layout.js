"use client";

import { cross } from '@/assets/svg';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function AuthLayout({ children }) {
  return (
    <section className="mx-[5%]">
      {children}
      <Image
        src={"/logo.png"}
        alt="logo"
        onClick={() => redirect('/')}
        width={60}
        height={60}
        className="rounded-xl cursor-pointer absolute top-4 left-4"
      />
      <Image
        src={cross}
        alt="close icon"
        onClick={() => redirect('/')}
        className="invert rounded-xl cursor-pointer absolute top-4 right-4"
      />
    </section>
  );
}
