'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStateContext } from '@/store';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
} from '../ui/sidebar';
import MobileCloseButton from './components/mobile-closebtn';
import NavContent from './components/nev-contwent';
import { pixiApplicationInit } from '@/pixi-js-scripts/bridge';
import Link from 'next/link';
import CoinToggler from './CoinToggler';
import BuyReedem from '../Buy-Reedem/components';
import useHeader from '../Header/hooks/useHeader';
import { useRouter } from 'next/navigation';
import { Facebook, Instagram, Tiktok, Twitter } from '../socials';

export default function SidebarSection({ props }) {
  const { state, dispatch } = useStateContext();
  const router = useRouter();
  const { handleClick, isOpen, clickedButton, handleButtonClick } = useHeader();
  const isMobile = useIsMobile();
  useEffect(() => {
    pixiApplicationInit();
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="!bg-new-primary"
      open={state.leftPanel}
    >
      {isMobile && <MobileCloseButton />}
      <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollable-Content-Home bg-new-primary">
        <SidebarContent className="p-2 group-data-[collapsible=icon]:px-2">
          <Link
            href={'/'}
            className="text-white font-bold cursor-pointer flex items-center justify-center"
          >
            <Image
              src="/logo.png"
              alt="company-logo"
              height={10}
              width={500}
              className="h-auto w-auto object-contain"
            />
          </Link>

          <div
            className="mb-6 mx-1 p-4 text-white border-2 border-yellow-400 bg-[#18111A]"
            style={{ boxShadow: '0 0 16px 2px #FFD60088' }}
          >
            <CoinToggler />
            <div className="flex gap-2">
              <button
                className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors"
                onClick={() => {
                  router.push('/stores');
                  dispatch({
                    type: 'SET_LEFT_PANEL',
                    payload: !state.leftPanel,
                  });
                }}
              >
                Get Coins
              </button>
              <button
                className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors"
                onClick={() => handleButtonClick('redeem')}
              >
                Redeem
              </button>
            </div>
          </div>

          {isOpen && (
            <BuyReedem
              isOpen={isOpen}
              handleClick={handleClick}
              buttonType={clickedButton}
            />
          )}

          <NavContent />

          <div className="mt-10 flex items-center justify-center gap-3 mb-10">
            <Instagram />
            <Tiktok />
            <Facebook />
            <Twitter />
          </div>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
