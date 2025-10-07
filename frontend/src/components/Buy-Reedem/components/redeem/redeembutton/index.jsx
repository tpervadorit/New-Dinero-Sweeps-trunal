'use client';
import {
  chevronDown,
  circleHelp,
  equalApprox,
  usd,
  warningIcon,
  // warningIcon,
} from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useReedem from '../../../hooks/useReedem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Controller } from 'react-hook-form';
import CustomToast from '@/common/components/custom-toaster';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const Redeem = ({ handleCloseDialog }) => {
  const {
    handleClick = () => {},
    handleSelect = () => {},
    selectedCrypto,
    cryptoCurency = [],
    control = {},
    handleSubmit = () => {},
    onSubmit = () => {},
    setShowToast,
    showToast,
    message,
    status,
    loading,
    isEmailVerified,
    redeemableBalance,
    isValid,
    t,
    convertedData,
    setInputAmount,
    handleConversion,
    veriffStatus,
  } = useReedem();

  const [debouncedAmount, setDebouncedAmount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (debouncedAmount > 0) {
        handleConversion(selectedCrypto.name);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [debouncedAmount, selectedCrypto.name]);

  return (
    <>
      {veriffStatus === 'approved' ? (
        <>
          <div className="flex justify-center my-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full">
                <Button
                  onClick={handleClick}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-between px-3 h-fit py-1"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Image
                      src={selectedCrypto?.icon}
                      alt={selectedCrypto?.name}
                      height={32}
                      width={32}
                    />
                    <div className="text-base font-bold flex flex-col">
                      <span>{selectedCrypto?.key?.toUpperCase()}</span>
                      <span className="text-xs font-normal capitalize">
                        {selectedCrypto?.name}
                      </span>
                    </div>
                  </div>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-700 p-2 text-white border-none">
                <ScrollArea className="h-56">
                  <DropdownMenuGroup>
                    {cryptoCurency?.map((crypto) => (
                      <DropdownMenuItem
                        key={crypto.id}
                        onClick={() => handleSelect(crypto)}
                        className="w-96"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Image
                            src={crypto?.icon}
                            alt={crypto?.name}
                            height={32}
                            width={32}
                          />
                          <div className="text-base font-bold flex flex-col">
                            <span>{crypto?.key?.toUpperCase()}</span>
                            <span className="text-xs font-normal capitalize">
                              {crypto?.name}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-3 text-white my-3">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <div className="flex justify-between mb-1">
                  <Label className="flex flex-col">
                    {t('amountToRedeem')}
                    <span className="text-green-400 text-xs">{t('minSC')}</span>
                  </Label>
                  <div>
                    <Label className="flex flex-col">
                      <div className="flex items-center space-x-2 m-0">
                        <span>{t('redeemable')}</span>
                        <Image
                          src={circleHelp}
                          alt="circle help icon"
                          height={16}
                          width={16}
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Image
                          src={equalApprox}
                          alt="equal approx"
                          height={12}
                          width={12}
                        />
                        <span className="text-green-400 text-xs underline">
                          {redeemableBalance} {t('sc')}
                        </span>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="relative">
                  <Controller
                    control={control}
                    name="amount"
                    rules={{
                      required: 'Amount is required',
                      min: {
                        value: 30,
                        message: 'Minimum redeemable amount is 30SC.',
                      },
                      max: {
                        value: parseFloat(redeemableBalance),
                        message:
                          'You do not have enough redeemable balance in your account',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          disabled={!isEmailVerified}
                          type="text"
                          {...field}
                          className="text-white bg-neutral-700 rounded-md p-5"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(e);
                            setInputAmount(Number(value));
                            setDebouncedAmount(Number(value));
                          }}
                        />
                        <Image
                          src={usd}
                          alt="usd"
                          height={20}
                          width={20}
                          className="absolute right-2 mt-5 top-0 transform -translate-y-1/2"
                        />
                        {fieldState.error && (
                          <span className="text-red-500 text-sm">
                            {fieldState.error.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Redeem to</Label>
                <Controller
                  control={control}
                  name="address"
                  rules={{
                    required: 'Address is required',
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        disabled={!isEmailVerified}
                        type="text"
                        {...field}
                        placeholder="Enter you BTC Address"
                        className="text-white bg-neutral-700 rounded-md p-5"
                      />
                      {fieldState.error && (
                        <span className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <p>Transaction fee :</p>
                <p>
                  <span className="text-green-600">0.00005000</span>{' '}
                  {selectedCrypto?.key?.toUpperCase()}
                </p>
              </div>

              {selectedCrypto && control._formValues?.amount && (
                <div className="text-white rounded-md flex flex-col space-y-2">
                  <span className="font-semibold text-sm">
                    {t('Estimated receive')}
                  </span>
                  <div className="flex items-center p-4 rounded-lg justify-between gap-2 mt-2 sm:mt-0 bg-neutral-700">
                    <span className="text-green-400 font-bold">
                      {/* Assuming 1 SC = selectedCrypto.rate (just an example, you might need real conversion logic) */}
                      {parseFloat(convertedData || 0).toFixed(6)}{' '}
                      {selectedCrypto.name}
                    </span>
                    <Image
                      src={selectedCrypto.icon}
                      alt={selectedCrypto.name}
                      height={24}
                      width={24}
                    />
                  </div>
                </div>
              )}

              <Button
                loading={loading}
                disabled={loading || !isEmailVerified || !isValid}
                type="submit"
                className="w-full bg-red-500 hover:bg-red-700 cursor-pointer text-white rounded-full"
              >
                {t('redeem')}
              </Button>

              <div className="bg-neutral-700 p-3 rounded-md">
                <p className="text-gray-300">{t('redemptionNote')}</p>
              </div>

              <CustomToast
                showToast={showToast}
                setShowToast={setShowToast}
                message={message}
                status={status}
              />
            </form>
          </div>
        </>
      ) : (
        <div className="my-4 rounded-2xl bg-stone-700 text-white text-center p-3 font-semibold">
          <p className="text-2xl flex justify-center items-center">
            <Image src={warningIcon} alt="warning icon" className="mx-2" />
            {t('warning')}:
          </p>
          <p className="my-2">
            {t('redeemAfter')}&nbsp;
            <span
              className="underline cursor-pointer"
              onClick={() => {
                router.push('/setting?active=verify');
                handleCloseDialog();
              }}
            >
              {t('settingVeriffStatus')}.
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Redeem;
