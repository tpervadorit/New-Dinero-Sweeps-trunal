import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useEmail from '../../hooks/useEmail';
import { Controller } from 'react-hook-form';
import CustomToast from '@/common/components/custom-toaster';

const Email = () => {
  const {
    control,
    handleSubmit,
    onOtpSubmit,
    emailSubmitted,
    handleEmailSubmit,
    emailVerified,
    message,
    showToast,
    status,
    setShowToast,
    isOtpLoading,
    isEmailLoading,
    email,
    timer,
    isTimerActive,
  } = useEmail();

  const isValidEmail = (email) => {
    const basicRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!basicRegex.test(email)) {
      return 'Please enter valid email address';
    }

    const domain = email.split('@')[1].toLowerCase();

    const strictProviders = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
      'live.com',
      'pervadorit.com',
    ];

    for (const provider of strictProviders) {
      if (domain.includes(provider.split('.')[0]) && domain !== provider) {
        return `Please enter a valid email providers eg: ${provider}`;
      }
    }
    return true;
  };

  return (
    <section className="rounded">
      {emailVerified ? (
        <div className="mb-2 w-full">
          <div className="text-white font-bold mb-2.5">Current Email</div>
          <Input
            value={email}
            className={`rounded-md w-full text-white bg-neutral-800`}
            locked
          />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <div className="">
              <div className="mb-2">
                <div className="text-white font-bold">Email</div>
                <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2.5">
                  (Gear up, because every week you&apos;ll unlock an epic bonus
                  email)
                </div>
                <Controller
                  control={control}
                  name="userEmail"
                  rules={{
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message:
                        'Please enter a valid email address (lowercase only)',
                    },
                  }}
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;
                    return (
                      <>
                        <div className="w-full md:w-1/2">
                          <div className="flex flex-col items-start">
                            <Input
                              {...field}
                              placeholder="Enter your email"
                              className={`bg-neutral-800 w-full ${error && 'border-red-500'}`}
                              onChange={(e) =>
                                field.onChange(e.target.value.toLowerCase())
                              }
                            />
                            {error && (
                              <p className="text-red-500 text-base mt-1 break-words">
                                {error?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <div className="mt-0 flex justify-end">
              <Button
                loading={isEmailLoading}
                disabled={isEmailLoading || emailSubmitted}
                type="submit"
                className="bg-red-500 py-2 text-white rounded-full hover:bg-red-600"
              >
                Send
              </Button>
            </div>
          </form>

          {/* OTP Form */}
          <form onSubmit={handleSubmit(onOtpSubmit)}>
            <div>
              <div className="mb-2">
                <div className="text-white font-bold">
                  Verification Code <span className="text-red-500">*</span>
                </div>
                <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2.5">
                  (Haven&apos;t received? Please check junk email)
                </div>
                <Controller
                  control={control}
                  name="otp"
                  rules={{
                    required:
                      emailSubmitted && 'Please enter your Verification Code',
                  }}
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;
                    return (
                      <div className="w-full md:w-1/2">
                        <div className="flex flex-col items-start">
                          <Input
                            {...field}
                            className={`bg-neutral-800 w-full ${error && 'border-red-500'}`}
                            type="tel"
                            maxLength={6}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                            }}
                            disabled={!emailSubmitted || isOtpLoading}
                          />
                          {error && (
                            <p className="text-red-500 text-base mt-1 break-words">
                              {error?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
              {isTimerActive && (
                <div className="text-md font-medium text-green-500 w-fit rounded-xl mt-2">
                  OTP expires in:{' '}
                  {String(Math.floor(timer / 60)).padStart(2, '0')}:
                  {String(timer % 60).padStart(2, '0')}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <div className="text-[rgb(var(--lb-blue-250))] text-[13px]">
                If you don&apos;t receive the email, you can check it in spam
              </div>
              <Button
                loading={isOtpLoading}
                disabled={!emailSubmitted || isOtpLoading}
                type="submit"
                className="bg-red-500 py-2 text-white rounded-full hover:bg-red-600"
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
        status={status}
      />
    </section>
  );
};

export default Email;
