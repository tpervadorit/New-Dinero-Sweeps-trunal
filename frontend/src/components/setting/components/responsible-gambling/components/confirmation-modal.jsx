'use client';
import { cross } from '@/assets/svg';
import CustomToast from '@/common/components/custom-toaster';
// import DatePicker from '@/common/components/date-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import React from 'react';

const ConfirmationModal = (props) => {
  const {
    isOpen,
    handleClick,
    checkedValue,
    handleRadio,
    handleDate,
    selectedDate,
    handleRequestSubmit,
    loading,
    message,
    setShowToast,
    showToast,
    status,
  } = props;
  return (
    <Dialog open={isOpen} onOpenChange={handleClick} className="">
      <DialogContent className="w-[90%] sm:w-full max-w-lg !bg-new-primary !min-h-64 h-fit mx-auto mb-6 rounded-xl border-none">
        <DialogHeader className="flex flex-row justify-between h-7">
          <DialogTitle className="text-white text-xl">
            Self Exclusion
          </DialogTitle>
          <Image
            src={cross}
            alt="close icon"
            onClick={handleClick}
            className="absolute top-5 right-5 invert hover:bg-gray-500 rounded-xl"
          />
        </DialogHeader>
        <div
          style={{
            maxHeight: '24rem',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <p className="text-white ml-1">Choose a self-exclusion type</p>
          <form onSubmit={handleRequestSubmit}>
            <RadioGroup
              onValueChange={handleRadio}
              defaultValue={checkedValue}
              className="flex space-x-1 space-y-1 mt-7"
            >
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="permanent" id="permanent" />
                <label htmlFor="permanent" className="font-normal text-white">
                  Permanent
                </label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="date" id="date" />
                <label htmlFor="date" className="font-normal text-white">
                  Choose Date
                </label>
              </div>
            </RadioGroup>
            <div>
              {checkedValue === 'date' && (
                <div className="space-x-3 mt-5">
                  {/* <DatePicker
                  //   className="text-white"
                  selected={selectedDate}
                  onSelect={(date) => {
                    handleDate(date);
                  }}
                /> */}
                  <input
                    className="w-[50%] p-2 border border-[rgb(var(--lb-blue-200))] text-white bg-transparent rounded-md 
             [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-100"
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      handleDate(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mt-[50px] flex justify-center">
              <Button
                loading={loading}
                disabled={loading}
                className="bg-red-500 text-white rounded-full font-semibold hover:bg-red-400"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <CustomToast
          message={message}
          setShowToast={setShowToast}
          showToast={showToast}
          status={status}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
