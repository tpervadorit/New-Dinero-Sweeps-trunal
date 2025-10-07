'use client';

import Image from 'next/image';
import StartPage from '@/components/start-page/components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <section className="px-[5%] text-white w-full min-h-screen h-screen scrollable-Content-Home scrollable-Content scrollable-Content-new overflow-y-auto">
      <div className="w-full h-20 flex items-center justify-between px-10 fixed top-0 left-0 bg-neutral-900/80 z-50">
        <Image
          src={'/logo.png'}
          alt="logo"
          onClick={() => redirect('/')}
          width={60}
          height={60}
          className="rounded-xl cursor-pointer"
        />
        <div className="space-x-3">
          <button
            className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors px-5"
            onClick={() => {
              router.push('/signup');
            }}
          >
            Signup
          </button>
          <button
            className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors px-5"
            onClick={() => {
              router.push('/login');
            }}
          >
            Login
          </button>
        </div>
      </div>
      <StartPage />
    </section>
  );
}
