import { gifIcon, smile } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import useSendChat from '../../hooks/useSendChat';
import GifPicker from 'gif-picker-react';
import { GIF_TENOR_API_KEY } from '../../constants';

const ChatFooter = ({ sendMessage }) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    autoResizeTextarea,
    textareaRef,
    handleEmojiSelect,
    characterCount,
    error,
    handleInputChange,
    isPickerOpen,
    setIsPickerOpen,
    isGifOpen,
    handleGifSelect,
    pickerRef,
    handleGifClick,
  } = useSendChat({ sendMessage });

  return (
    <div className="p-2 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center relative border border-yellow-400 rounded-lg bg-neutral-800">
          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                ref={textareaRef}
                rows="1"
                onInput={(e) => {
                  autoResizeTextarea();
                  handleInputChange(e);
                }}
                className="w-full p-1.5 text-white bg-transparent placeholder-gray-400 outline-none resize-none overflow-hidden"
                placeholder="Type your message..."
              />
            )}
          />
          <span
            type="button"
            className="text-white text-lg rounded-full focus:outline-none cursor-pointer mr-2 right-1"
          >
            <div className="flex gap-1 mr-1">
              <Image
                src={smile}
                alt="emoji"
                className="opacity-70"
                onClick={() => setIsPickerOpen(!isPickerOpen)}
              />
              <Image
                src={gifIcon}
                alt="emoji"
                className="opacity-70"
                onClick={handleGifClick}
              />
            </div>
          </span>

          {isPickerOpen && (
            <div className="fixed bottom-[60px] right-2 z-50">
              <button
                aria-label="Close emoji picker"
                className="absolute top-1 right-1 z-50 text-white bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600"
                onClick={() => setIsPickerOpen(false)}
              >
                ✕
              </button>
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="dark"
                emojiSize={20}
                perLine={8}
                showPreview={false}
              />
            </div>
          )}

          {isGifOpen && (
            <div
              className="absolute bottom-[50px] right-[0px] z-10 "
              ref={pickerRef}
            >
              <GifPicker
                tenorApiKey={GIF_TENOR_API_KEY}
                theme="dark"
                height={400}
                width={350}
                onGifClick={handleGifSelect}
              />
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-2"></div>
          <div className="inline-flex gap-3 items-center relative">
            <span
              className={`text-sm ${error ? 'text-red-500' : 'text-white'}`}
            >
              {characterCount}
            </span>
            <Button
              type="submit"
              className={`bg-yellow-400 hover:bg-yellow-300 cursor-pointer text-center text-black rounded-lg ${error ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={!!error}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
