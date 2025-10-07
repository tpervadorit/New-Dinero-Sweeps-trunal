'use client';

import { headPortrait } from '@/assets/png';
import { cross } from '@/assets/svg';
import {
  AvatarFallback,
  Avatar as AvatarIcon,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import useUserInfo from '../hooks/useUserInfo';
import { isEmpty, truncateDecimals } from '@/lib/utils';
import CustomCircularloading from '@/common/components/custom-circular-loading';

const UserInfo = ({
  isOpen,
  handleClick,
  chatUserData = {},
  chatUserLoading = false,
}) => {
  const { userData = {}, handleClickEdit, userLoading } = useUserInfo();
  const isChatData = !isEmpty(chatUserData);

  // Ensure displayData is always an object to prevent destructuring errors
  const displayData = isChatData ? chatUserData : userData || {};

  const {
    firstName = '',
    lastName = '',
    username = '',
    userId = '',
    profileImage = '',
    losses = 0,
    win = 0,
    betCount = 0,
    wagered = 0,
    userWallet = [],
  } = displayData;

  const Box = ({ num = 0, title = '', prefix = '', postfix = '' }) => (
    <div className="h-fit bg-gradient-to-b from-yellow-400 to-pink-500 p-0.5 rounded-xl">
      <div className="h-full py-2 px-1 sm:py-4 sm:px-2 gap-3 flex flex-col items-center justify-center text-center rounded-xl bg-new-secondary">
        <p className="text-white text-xl font-bold">
          {prefix}
          {truncateDecimals(num, 2) || 0}
          {postfix}
        </p>
        <p className="text-gray-400 text-sm font-semibold">{title}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogContent className="w-[90%] sm:w-full max-w-lg p-6 rounded-xl border-none !min-h-64 h-fit !bg-new-secondary">
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>

        <Image
          src={cross}
          alt="close icon"
          onClick={handleClick}
          className="absolute top-5 right-5 invert hover:bg-gray-500 rounded-full cursor-pointer w-6 h-6"
        />

        {userLoading || chatUserLoading ? (
          <CustomCircularloading />
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-20 h-20 rounded-full">
                <AvatarIcon className="h-20 w-20">
                  <AvatarImage src={profileImage} alt="avatar" />
                  <AvatarFallback>
                    <Image
                      src={headPortrait}
                      alt="profile fallback"
                      width={80}
                      height={80}
                    />
                  </AvatarFallback>
                </AvatarIcon>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0 items-center w-full">
                <div className="space-x-4 items-start">
                  <div>
                    <h2 className="text-white text-lg font-bold">
                      {(firstName && `${firstName} ${lastName}`) ||
                        (username && `@${username}`) ||
                        'User Name'}
                    </h2>
                    <p className="text-gray-300 font-semibold">
                      ID: {userId || ''}
                    </p>
                  </div>
                </div>

                <div className="space-x-4 items-start">
                  <div>
                    <h2 className="text-white text-lg">Refrred friends: {0}</h2>
                    <p className="text-green-500 text-lg font-bold">
                      SC{' '}
                      {userWallet.find((i) => i.currencyCode === 'BSC')
                        ?.balance ?? 0}{' '}
                      Earned
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 p-1">
              <Box num={win} title="WINS" />
              <Box num={losses} title="LOSSES" />
              <Box num={betCount} title="BETS" />
              <Box num={wagered} title="WAGERED" prefix="$" postfix="K" />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserInfo;
