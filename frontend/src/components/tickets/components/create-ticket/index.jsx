import React from 'react';
import { Controller } from 'react-hook-form';
import CustomSelect from '@/common/components/custom-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useCreateTicket from '../../hook/useCreateTicket';
import CustomToast from '@/common/components/custom-toaster';
import { selectOptions } from '../../constant';

const CreateTicket = ({ handleClick }) => {
  const {
    loading,
    message,
    onSubmit,
    showToast,
    status,
    setShowToast,
    control,
    handleSubmit,
    t,
  } = useCreateTicket({ handleClick });

  return (
    <>
      <div className="w-full px-3 py-2 mb-2">
        <ol className="text-gray-200 text-base font-medium">
          <h3 className="mb-3 text-yellow-400 text-lg font-bold">
            {t('notice')}
          </h3>
          <li>1. {t('ticketDescription')}</li>
          <li>2. {t('ticketClosureWarning')}</li>
          <li>3. {t('ticketResponseTime')}</li>
          <li>4. {t('weekendResponseTime')}</li>
        </ol>
      </div>

      <div className="w-full px-3 mb-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* <Controller
            name="category"
            control={control}
            render={({ field }) => ( */}
          <CustomSelect
            // {...field}
            options={selectOptions}
            className="w-full mt-2"
          />
          {/* )}
          /> */}
          <Controller
            name="subject"
            control={control}
            rules={{ required: 'Subject is required' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Subject"
                  className={`rounded-md w-full bg-neutral-800 ${
                    fieldState.error
                      ? 'border border-red-500 text-white'
                      : 'text-white'
                  }`}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
          <Controller
            name="body"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field, fieldState }) => (
              <>
                <Textarea
                  {...field}
                  placeholder="Describe the problem you're having in great detail"
                  className={`rounded-md w-full bg-neutral-800 border-0 min-h-28 ${
                    fieldState.error
                      ? 'border border-red-500 text-white'
                      : 'text-white'
                  }`}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
          <div className="w-full flex justify-center my-2">
            <Button
              type="submit"
              className="bg-red-600 p-5 px-10 hover:bg-red-700 cursor-pointer font-bold text-white rounded-full"
              disabled={loading}
              loading={loading}
            >
              {t('submit')}
            </Button>
          </div>
        </form>
      </div>

      <CustomToast
        message={message}
        setShowToast={setShowToast}
        status={status}
        showToast={showToast}
      />
    </>
  );
};

export default CreateTicket;
