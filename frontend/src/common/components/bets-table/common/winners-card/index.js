import { winner1, winner2, winner3 } from '@/assets/png';
import { usd } from '@/assets/svg';
import UserInfo from '@/components/UserInfo/components';
import Image from 'next/image';
import useWinnerCard from '../../hooks/useWinnerCard';
import { cn, truncateDecimals } from '@/lib/utils';

const WinnersCard = ({ data = {}, rank }) => {
  const { chatUserLoading, handleOpenUserInfo, isOpen, setIsOpen, userData } =
    useWinnerCard();
  const {
    // profileimage,
    total_bet_amount,
    total_win_amount,
    user_id,
    username,
    // win_difference,
  } = data;
  const winnerImages = {
    1: winner1,
    2: winner2,
    3: winner3,
  };
  const profileBorderStyle = {
    1: 'border-green-600',
    2: 'border-white/70',
    3: 'border-amber-600',
  };
  const winnerImage = () => winnerImages[rank] || winner3;
  const multiplier = total_win_amount / total_bet_amount;
  return (
    <div
      className={cn(
        'text-white w-full md:w-1/3 md:max-w-[33%] flex-1 rounded flex flex-col items-center border-2',
        `${profileBorderStyle[rank] || 'border-amber-600'}`,
        'mt-20 relative'
      )}
    >
      <div className={`px-4 py-2 grid gap-4 w-full mb-10`}>
        <Image
          className="object-cover min-w-40 min-h-40 w-40 h-40 mx-auto -mt-32"
          src={winnerImage(rank)}
          alt={`winner-${rank}`}
          width={320}
          height={320}
        />
        <div className="w-full">
          <div className="flex flex-col justify-center gap-4 items-center w-full text-center">
            <div
              onClick={() => handleOpenUserInfo(user_id)}
              className="cursor-pointer"
            >
              <p className="text-white font-medium">
                User ID: <span className="font-normal">{user_id}</span>
              </p>
              <p className="text-pink-500 text-lg font-bold truncate">
                {username}
              </p>
            </div>
            <div>
              <p className="text-white font-medium">Multiplier</p>
              <p className="text-yellow-500 text-lg font-bold">
                {truncateDecimals(multiplier, 2)}X
              </p>
            </div>
            <div>
              <p className="text-white font-medium">Result</p>
              <p className="text-green-500 text-lg font-bold flex gap-2">
                <Image src={usd} width={13} height={13} alt="gc-icon" />
                {total_win_amount}
              </p>
            </div>
          </div>
          {/* <div className="flex justify-evenly gap-1 mt-2 bg-[rgb(var(--lb-blue-900))] p-1 rounded">
            <div className="flex flex-col items-center">
              <p className="text-[14px] text-[rgb(var(--lb-blue-250))] font-medium">
                Multiplier
              </p>
              <p className="text-[12px] text-center text-white ">
                {truncateDecimals(multiplier, 2)}X
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[14px] text-[rgb(var(--lb-blue-250))] font-medium">
                Result
              </p>
              <div className="text-[12px] text-center text-white flex ">
                <Image src={usd} width={13} height={13} alt="gc-icon" />
                {total_win_amount}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="bg-[hsl(var(--new-background))] absolute bottom-0 translate-y-1/2 px-3">
        <h1
          className={`text-3xl font-bold text-center  drop-shadow-text-glow ${rank === 2 ? 'text-white' : rank === 1 ? 'text-green-500' : 'text-amber-500'}`}
        >
          No. {rank}
        </h1>
      </div>
      {isOpen && (
        <UserInfo
          isOpen={isOpen}
          handleClick={() => setIsOpen(!isOpen)}
          chatUserData={userData}
          chatUserLoading={chatUserLoading}
        />
      )}
    </div>
  );
};

export default WinnersCard;
