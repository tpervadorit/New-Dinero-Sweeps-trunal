'use client';

import Image from 'next/image';

import { copy } from '@/assets/svg';
import CustomToast from '@/common/components/custom-toaster';
import useStart from '../../hook/useStart';

const Start = () => {
  const {
    // handleClick,
    handleCopy,
    message,
    refLink,
    setToastState,
    showToast,
    status,
  } = useStart();

  return (
    <section className="rounded">
      <div className="text-new-primary-foreground">
        <div className="mb-3 space-y-2">
          <div className="text-new-primary-foreground font-bold">
            The formula:
          </div>
          <div className="rounded-md w-full md:w-1/2 p-2 px-4 text-sm font-semibold bg-neutral-800">
            SC wagered * 1% * commission rate
          </div>
          <div className="text-yellow-600 text-sm">
            Commission rate depends on your affiliate level, starting from 25%.
          </div>
        </div>
        <div className="mb-2 space-y-2">
          <div className="text-new-primary-foreground font-bold">
            Referral Link
          </div>
          <div className="rounded-md w-full md:w-1/2 p-2 px-4 text-sm font-semibold bg-neutral-800 relative">
            <span>{refLink}</span>
            {/* Copy to clipboard here */}
            <span className="cursor-pointer absolute self-center right-3" onClick={handleCopy}>
              <Image
                src={copy}
                alt="coin icon"
                className="w-4 h-4 mr-1"
                style={{ filter: 'invert(1)' }}
              />
            </span>
          </div>
        </div>
      </div>
      {/* <div className="mt-0 p-4 flex justify-between">
        <Button
          onClick={handleClick}
          className="bg-green-500 py-2 text-white rounded hover:bg-green-600 ml-auto mr-2"
        >
          Download Banners
        </Button>
      </div> */}
      <CustomToast
        showToast={showToast}
        setShowToast={(val) =>
          setToastState((prev) => ({ ...prev, showToast: val }))
        }
        message={message}
        status={status}
      />
    </section>
  );
};
export default Start;
