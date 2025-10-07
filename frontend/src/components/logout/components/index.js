'use client';
import { cross } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';
import useLogout from '../hooks/useLogout';
const Logout = ({ isOpen, handleClick }) => {
  const { onClickLogout, userName } = useLogout({ handleClick });

  return (
    <Dialog open={isOpen} onOpenChange={handleClick} className="">
      <DialogContent className="w-[90%] md:w-full max-w-lg min-h-[100] mx-auto mb-6 rounded-xl border-none">
        <DialogHeader className="flex flex-row justify-between">
          <div className="flex justify-center items-center space-x-2">
            <DialogTitle className="text-white text-[18px]">Logout</DialogTitle>
          </div>
          <Image
            src={cross}
            alt="close icon"
            onClick={handleClick}
            className="invert hover:bg-gray-500 rounded-xl cursor-pointer"
          />
        </DialogHeader>
        <div className="text-center text-white">
          Username:{' '}
          <span className="text-green-500 font-bold tracking-wide">
            {userName}
          </span>
        </div>
        <div className="flex justify-center">
          <Button
            className="w-[50%] bg-red-500 py-2 mt-2 text-white rounded hover:bg-red-800"
            onClick={onClickLogout}
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
