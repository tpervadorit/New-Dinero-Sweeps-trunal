import { chevronDown } from '@/assets/svg';
import CustomToast from '@/common/components/custom-toaster';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import useRain from '../../hooks/useRain';
import { ChevronDown } from 'lucide-react';

const Rain = ({ handleCloseDialog }) => {
  const {
    currency,
    message,
    playerType,
    rainCurrencyList,
    // setMessage,
    setPlayerType,
    handleSelect,
    t,
    control,
    handleSubmit,
    loading,
    onSubmit,
    setShowToast,
    showToast,
    status,
  } = useRain({ handleCloseDialog });
  return (
    <div className="text-white my-2 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label> {t('rainAmount')} </Label>
            <span className="text-gray-300 font-semibold text-sm">
              {currency.range}
            </span>
          </div>
          <Controller
            name="rainAmount"
            control={control}
            rules={{
              required: 'Rain amount is required',
              validate: (value) =>
                /^[0-9]+$/.test(value) || 'Only numeric values are allowed',
              min: {
                value: currency?.min,
                message: `Minimum value is ${currency?.min}`,
              },
              max: {
                value: currency?.max,
                message: `Maximum value is ${currency?.max}`,
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <div className="bg-neutral-700 flex items-center rounded-md p-0 m-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black w-36 space-x-2">
                        <Image
                          src={currency?.icon}
                          alt="usd"
                          className="h-5 w-5"
                        />
                        {currency?.name}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 text-white border-none">
                      <DropdownMenuGroup>
                        {rainCurrencyList.map((item) => (
                          <DropdownMenuItem
                            key={item.id}
                            onClick={() => handleSelect(item)}
                          >
                            <Image
                              src={item.icon}
                              alt={item.name}
                              className="h-4 w-4"
                            />
                            <span>{item.name}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Input
                    type="text"
                    placeholder={currency.placeholder}
                    {...field}
                    className="text-white text-end rounded-md border-none bg-transparent p-5"
                  />
                </div>
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label> {t('playerNumber')} </Label>
            <span className="text-gray-300 font-semibold text-sm">
              {playerType === 'All' ? '5-50' : '5-10'}
            </span>
          </div>
          <Controller
            name="playerNumber"
            control={control}
            rules={{
              required: 'Player number is required',
              validate: (value) =>
                /^[0-9]+$/.test(value) || 'Only numeric values are allowed',
              min: { value: 5, message: 'Minimum value is 5' },
              max: {
                value: playerType === 'All' ? 50 : 10,
                message: `Maximum value is ${playerType === 'All' ? 50 : 10}`,
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <div className="bg-neutral-700 flex items-center rounded-md p-0 m-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black w-36 space-x-2">
                        {playerType}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 text-white border-none">
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setPlayerType('All')}>
                          <span> {t('all')} </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setPlayerType('VIP ONLY')}
                        >
                          <span> {t('vipOnly')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Input
                    type="text"
                    {...field}
                    placeholder="10"
                        className="text-white text-end rounded-md border-none bg-transparent p-5"
                  />
                </div>
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="my-2 flex-col">
          <Label> {t('message')}</Label>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative"> */}
          <Controller
            name="message"
            control={control}
            rules={{ required: 'Message is required' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="text"
                  {...field}
                  placeholder={message?.msg}
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
          {/* <Image
                  src={chevronDown}
                  alt="drop down icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                /> */}
          {/* </div> */}
          {/* </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[rgb(var(--lb-blue-400))] p-2 text-white border-none">
              <DropdownMenuGroup>
                {Msg.map((msg) => (
                  <DropdownMenuItem
                    key={msg.id}
                    onClick={() => setMessage(msg)}
                  >
                    <span>{msg.msg}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          className="w-full bg-red-500 hover:bg-red-700 p-5 font-bold text-white rounded-full my-2"
        >
          {t('pourRain')}
        </Button>
      </form>
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
        status={status}
      />
    </div>
  );
};

export default Rain;
