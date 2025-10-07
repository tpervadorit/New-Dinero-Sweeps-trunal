// components/ConfirmBuyPopupWrapper.js
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ConfirmBuyPage from './ConfirmBuyPage';

export default function ConfirmBuyPopupWrapper({ item, handleCloseDialog }) {

  const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
      setIsOpen(!isOpen);
    };
  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogTrigger asChild>
        <button className="bg-pink-600 hover:bg-pink-800 w-full text-white font-bold rounded-md py-1.5 px-4">
          ${item.amount}
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-md mx-auto">
        <DialogTitle />
        <ConfirmBuyPage selectedPackage={item} handleClick={handleClick} handleCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
