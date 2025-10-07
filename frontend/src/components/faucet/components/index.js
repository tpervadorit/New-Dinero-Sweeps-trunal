'use client';
import { useEffect, useState } from 'react';
import { cross } from '@/assets/svg';
import CoinToggler from '@/components/Header/components/CoinToggler';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import useFaucet from '../hook/useFaucet';
import { Button } from '@/components/ui/button';
import CustomCircularloading from '@/common/components/custom-circular-loading';
import CustomToast from '@/common/components/custom-toaster';
import ReCAPTCHA from 'react-google-recaptcha';
import Timer from './timer';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { faucet0Balance } from '@/assets/png';

const Faucet = ({ isOpen, handleClick }) => {
  const {
    t,
    data,
    loading,
    handleSubmit,
    onSubmit,
    message,
    showToast,
    status,
    setShowToast,
    active,
    setActive,
    isFaucetClaimed,
    setCurrency,
    onChange,
    verified,
    error,
    getLoading,
    user,
    fetchFaucetData,
  } = useFaucet();
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    if (isFaucetClaimed) {
      setActive(false);
    }
  }, [isFaucetClaimed, setActive]);

  const handleClaim = async () => {
    const success = await onSubmit();
    if (success) {
      setActive(false);
      await fetchFaucetData();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClick} className="border-none">
      {/* <DialogContent className="max-w-lg max-h-[420px] mx-auto mb-6 rounded-lg bg-[hsl(var(--main-background))] shadow-lg border-none"> */}
      <DialogContent className="w-[90%] md:w-full max-w-lg min-h-[100] mx-auto mb-6 rounded-xl border-none">
        <DialogHeader className="max-h-8">
          <div className="hidden">
            <DialogTitle className="text-white">Faucet</DialogTitle>
          </div>
          <Image
            src={cross}
            alt="close icon"
            onClick={handleClick}
            className="invert hover:bg-gray-500 rounded-xl cursor-pointer absolute top-4 right-4"
          />
        </DialogHeader>

        {getLoading ? (
          <CustomCircularloading />
        ) : (
          <>
            {showHint && (
              <>
                <Image
                  alt=""
                  src={faucet0Balance}
                  className="-mb-5 -mt-28 mx-auto"
                  width={400}
                />
                <div className="relative w-[100%+6rem] -mx-6 mt-2 bg-red-800 text-yellow-200 p-4 mb-3 border-y-2 border-yellow-400 text-center uppercase">
                  <h2 className="font-bold mb-2 text-2xl">Hint</h2>
                  <ul className="text-lg list-decimal list-inside space-y-1">
                    <li>Multi-accounts using the faucet will be frozen</li>
                    <li>
                      The more active (share, purchase, chat), the more faucet
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => setShowHint(false)}
                  className="mx-auto bg-red-500 text-white hover:bg-red-400 rounded-full px-6 py-1"
                >
                  Got it!
                </Button>
              </>
            )}
            <p className="text-red-500 text-center">{error}</p>
            {active ? (
              <form
                onSubmit={handleSubmit(handleClaim)}
                className="flex flex-col justify-center gap-2"
              >
                {!error && (
                  <>
                    <div className="max-w-[304px] mx-auto">
                      <CoinToggler
                        setCurrency={setCurrency}
                        isPopupRequired={false}
                      />
                    </div>
                    <div className="flex justify-center items-center w-full max-w-[200px] sm:max-w-md mx-auto">
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                      />
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={loading || !verified}
                          type="submit"
                          className="bg-red-400 mx-auto hover:bg-red-300 rounded-full cursor-pointer text-white"
                        >
                          Claim.
                        </Button>
                      </TooltipTrigger>
                      {!user?.email && (
                        <TooltipContent
                          side="top"
                          className="z-[99999] text-white font-semibold border shadow-lg rounded-md p-4 mx-auto flex justify-center items-center"
                        >
                          <p>Hey, verify your email first to claim faucet!</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </>
                )}
              </form>
            ) : (
              <Timer
                initialTime={data?.timeRemainingForNextFaucet}
                setActive={setActive}
              />
            )}
            <CustomToast
              message={message}
              showToast={showToast}
              status={status}
              setShowToast={setShowToast}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Faucet;
