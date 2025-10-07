'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../../ui/button';
import useHeader from '../hooks/useHeader';
import CoinToggler from './CoinToggler';
import Logo from './Logo';
import ProfileSection from './ProfileSection';
import BuyReedem from '@/components/Buy-Reedem/components';

export default function Header() {
  const { t, handleClick, isOpen, clickedButton, handleButtonClick } =
    useHeader();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <header className="flex items-center justify-between bg-[hsl(var(--new-header))] p-1 px-5 sm:px-4 shadow-md sticky top-0 z-[11] h-16">
      {isMobile && (
        <>
          <Logo />
          <div
            className="flex items-center justify-center gap-4 border border-yellow-400 p-1 px-2 rounded-lg"
            style={{ boxShadow: '0 0 16px 2px #FFD60088' }}
          >
            <CoinToggler />
          </div>
          <div>
            <ProfileSection />
          </div>
        </>
      )}
      {isOpen && (
        <BuyReedem
          isOpen={isOpen}
          handleClick={handleClick}
          buttonType={clickedButton}
        />
      )}
    </header>
  );
}
