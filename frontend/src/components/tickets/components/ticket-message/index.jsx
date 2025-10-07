import { Button } from '@/components/ui/button';
import React from 'react';
import useTicketMessage from '../../hook/useTicketMessage';
import Image from 'next/image';
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarIcon,
} from '@/components/ui/avatar';
import { headPortrait, logoImage, ticketClose } from '@/assets/png';
import { Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import CustomToast from '@/common/components/custom-toaster';

const TicketMessage = ({ ticketId }) => {
  const {
    ticketMessageData,
    user,
    formatDate,
    control,
    handleSubmit,
    onSubmit,
    message,
    dataLoading,
    setShowToast,
    showToast,
    toastStatus,
    t,
  } = useTicketMessage({
    ticketId,
  });
  const { id, subject, body, ticketMessage, status } = ticketMessageData || {};
  const { username, profileImage } = user;

  return (
    <>
      <div className="w-[100%] px-4">
        <div className="font-bold">
          <div className="gap-2 text-white">
            <span> #[{id}]</span>
            <span> {subject} </span>
          </div>
        </div>
        <div className="my-3 rounded-sm">
          <div className="flex items-center gap-4 p-3">
            <AvatarIcon className="h-12 w-12">
              <AvatarImage src={profileImage} alt="avatar"></AvatarImage>
              <AvatarFallback>
                <Image
                  src={headPortrait}
                  alt="profileImage"
                  width={48}
                  height={48}
                />
              </AvatarFallback>
            </AvatarIcon>
            <div className="text-sm flex flex-col">
              <span className="text-white text-lg font-semibold">{username}</span>
              <span className='text-gray-400'>{formatDate(ticketMessageData?.createdAt)}</span>
            </div>
          </div>
          <div className="text-white p-3">{body}</div>
        </div>
        {ticketMessage?.map((msg) => (
          <div
            key={msg.id}
            className="border border-neutral-600  my-3 rounded-sm"
          >
            <div className="flex items-center gap-2 border-b border-neutral-600 p-3">
              <AvatarIcon className="h-10 w-10">
                {msg?.isAdminResponse ? (
                  <AvatarImage src={logoImage.src} alt="admin avatar" />
                ) : (
                  <AvatarImage src={profileImage} alt="avatar" />
                )}
                <AvatarFallback>
                  <Image
                    src={headPortrait}
                    alt="profileImage"
                    width={40}
                    height={40}
                  />
                </AvatarFallback>
              </AvatarIcon>
              <div className="text-neutral-500 text-sm">
                <p className="text-white font-semibold">
                  {msg?.isAdminResponse ? 'Dinero Sweeps' : username}
                </p>
                <p>{formatDate(msg?.createdAt)}</p>
              </div>
            </div>
            <div className="text-white text-sm p-3">{msg?.message}</div>
          </div>
        ))}
        <div className="rounded-sm">
          {status === 'open' || status === 'resolved' || status === 'active' ? (
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
              <Controller
                name="message"
                control={control}
                rules={{ required: 'message is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <Textarea
                      {...field}
                      placeholder="Describe the problem you're having in great detail"
                      className="text-white rounded-lg bg-neutral-800 p-3 mx-auto border-0 min-h-24"
                    />
                    {fieldState.error && (
                      <span className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  className="bg-red-600 p-5 px-10 hover:bg-red-800 cursor-pointer font-bold text-white rounded-full"
                  disabled={dataLoading}
                  loading={dataLoading}
                >
                  {t('submit')}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col justify-center  items-center gap-2 p-2">
              <Image
                src={ticketClose}
                alt="ticket close"
                width={80}
                height={80}
              />
              <p className="text-sm font-semibold text-[rgb(var(--lb-blue-200))]">
                {t('ticketClosed')}
              </p>
            </div>
          )}
        </div>
      </div>
      <CustomToast
        message={message}
        setShowToast={setShowToast}
        showToast={showToast}
        status={toastStatus}
      />
    </>
  );
};

export default TicketMessage;
