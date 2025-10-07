'use client';
import { eye, eyeOff } from '@/assets/svg';
import { ELEMENT } from '@/common/form-control';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import useUserAuth from '../hooks/useUserAuth';
import useForgotPassword from '../hooks/useForgotPassword';
import CustomDialog from '../TermsPrivacy';
import useTermsPrivacy from '../TermsPrivacy/hooks/useTermsPrivacy';
import { useEffect, useState } from 'react';
import { FORGOT_PASSWORD } from '../constant';
import { googlei, facebook, winJackpot } from '@/assets/png';
import { useRouter } from 'next/navigation';

const UserForm = ({
  controls,
  isSignUp = false,
  setIsForgotPassword,
  isForgotPassword = false,
  setToastState,
  geoInfo,
  isBlocked = false,
}) => {
  // Use useForm to get control, handleSubmit, watch
  const { control, handleSubmit, watch } = useForm();
  const router = useRouter();

  // Use hooks for auth and forgot password but do not destructure control/handleSubmit from them
  const authHook = useUserAuth({ isSignUp, setToastState });
  const forgotPasswordHook = useForgotPassword({
    setIsForgotPassword,
    setToastState,
  });

  // Use originalOnSubmit, loading, showPassword, togglePasswordVisibility from hooks
  const {
    onSubmit: originalOnSubmit,
    loading = false,
    showPassword = false,
    togglePasswordVisibility = () => {},
  } = isForgotPassword ? forgotPasswordHook : authHook;

  const [isMarkTick, setIsMarkTick] = useState(false);

  // Use local state for checkboxes to track acceptance
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    setIsMarkTick(!!isAgeChecked && !!termsChecked);
  }, [isAgeChecked, termsChecked]);

  const onSubmit = (data) => {
    if (isSignUp) {
      if (!data.isAge || !data.terms) {
        setToastState &&
          setToastState({
            showToast: true,
            message:
              'Please allow the Terms of Use, Privacy Policy, and Age/State restriction.',
            status: 'error',
          });
        return;
      }
    }

    if (isBlocked) {
      setToastState &&
        setToastState({
          showToast: true,
          message: 'Access from your region is not allowed.',
          status: 'error',
        });
      return;
    }
    originalOnSubmit(data);
  };

  const {
    termsData,
    privacyData,
    fetchTerms,
    fetchPrivacyPolicy,
    termsPrivacyLoading,
  } = useTermsPrivacy();

  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    type: null,
  });

  return (
    <div className="min-w-full w-full flex flex-col items-center justify-center">
      <div className="max-w-xl w-full flex flex-col justify-between flex-grow mb-7">
        <Image
          src={winJackpot}
          alt="Authenticate and win"
          width={300}
          height={200}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full flex flex-col justify-between flex-grow"
      >
        {controls?.map((item) => {
          const Component = ELEMENT[item.type];
          const isCheckbox = item.type === 'checkbox';
          const isPassword = item.name === 'password';

          return (
            <Controller
              key={item.name}
              control={control}
              name={item.name}
              rules={
                isSignUp &&
                (item.name === 'username' || item.name === 'password')
                  ? {
                      required: item.required,
                      pattern: item.pattern,
                    }
                  : {
                      required: item.required,
                      pattern: item.pattern,
                    }
              }
              render={({ field, fieldState }) => {
                const error = fieldState?.error;
                return (
                  <div className="text-left flex flex-col">
                    <div className="items-center mt-2 relative">
                      <div
                        className={`${
                          error ? 'border-red-500' : 'border-gray-300'
                        } transition-colors duration-200 space-y-10 space-x-10`}
                      >
                        {isPassword ? (
                          <div className="relative w-full">
                            <Component
                              type={showPassword ? 'text' : 'password'}
                              placeholder={item.placeholder}
                              {...field}
                              // className={`w-full ${error && 'border-red-500'} focus:bg-transparent`}
                              className={`rounded-md w-full bg-neutral-800 focus:bg-neutral-700 ${
                                error
                                  ? 'border border-red-500 text-white'
                                  : 'text-white'
                              }`}
                            />
                            <div
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                              {showPassword ? (
                                <Image src={eyeOff} alt="eye-off" />
                              ) : (
                                <Image src={eye} alt="eye" />
                              )}
                            </div>
                          </div>
                        ) : isCheckbox ? (
                          <div className="!w-full flex flex-row gap-2">
                            <Component
                              placeholder={item.placeholder}
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (item.name === 'isAge')
                                  setIsAgeChecked(checked);
                                if (item.name === 'terms')
                                  setTermsChecked(checked);
                              }}
                              name={item.name}
                              {...field}
                              // className={`mt-0.5 ${error && 'border-red-500'}`}
                              className={`rounded-md bg-neutral-800 ${
                                error
                                  ? 'border border-red-500 text-white'
                                  : 'text-white'
                              }`}
                            />
                            <label
                              htmlFor={item.name}
                              className="font-size-6 sm:font-size-10 text-xs sm:text-sm text-gray-400 leading-4"
                            >
                              {item.isLink ? (
                                <>
                                  <span>I accept the </span>
                                  {item.label.includes('Terms of Use') && (
                                    <span
                                      className="cursor-pointer underline text-white"
                                      onClick={() => {
                                        setDialogConfig({
                                          isOpen: true,
                                          type: 'terms',
                                        });
                                        fetchTerms();
                                      }}
                                    >
                                      Terms of Use
                                    </span>
                                  )}
                                  {item.label.includes('Terms of Use') &&
                                    item.label.includes('Privacy Policy') &&
                                    ' and '}
                                  {item.label.includes('Privacy Policy') && (
                                    <span
                                      className="cursor-pointer underline text-white"
                                      onClick={() => {
                                        setDialogConfig({
                                          isOpen: true,
                                          type: 'privacy',
                                        });
                                        fetchPrivacyPolicy();
                                      }}
                                    >
                                      Privacy Policy
                                    </span>
                                  )}
                                </>
                              ) : (
                                item.label
                              )}
                            </label>
                          </div>
                        ) : (
                          <div className="relative w-full">
                            <Component
                              placeholder={item.placeholder}
                              {...field}
                              className={`rounded-md w-full bg-neutral-800 focus:bg-neutral-700 ${
                                error
                                  ? 'border border-red-500 text-white'
                                  : 'text-white'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {error && (
                      <div className="text-red-500 mt-0.5 text-xs sm:text-sm transition-opacity duration-300 ease-in-out opacity-100 translate-y-0">
                        {error.message}
                      </div>
                    )}
                  </div>
                );
              }}
            />
          );
        })}

        {!isForgotPassword && (
          <Button
            type="submit"
            className="w-fit mx-auto my-7 px-7 bg-red-500 text-white hover:bg-red-600 rounded-full"
            loading={loading}
            disabled={loading || isBlocked}
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
        )}

        <div className="my-2 text-center flex items-center justify-evenly mb-2">
          {!isSignUp && !isForgotPassword && (
            <span
              className="text-gray-300 underline text-sm cursor-pointer inline-block"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </span>
          )}

          {!isSignUp && !isForgotPassword && (
            <span
              className="text-gray-300 underline text-sm cursor-pointer inline-block"
              onClick={() => router.push('/signup')}
            >
              Signup
            </span>
          )}

          {isSignUp && (
            <div className="text-white flex items-center justify-center gap-2">
              Already have an account?
              <span
                className="text-gray-300 underline text-sm cursor-pointer inline-block"
                onClick={() => router.push('/login')}
              >
                Login
              </span>
            </div>
          )}
        </div>

        {isForgotPassword ? (
          <div className="flex gap-4 my-7 mx-auto">
            <Button
              type="button"
              className="w-fit border bg-transparent text-white rounded-full"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to login
            </Button>
            <Button
              type="submit"
              className="w-fit bg-red-500 text-white rounded-full hover:bg-red-600"
              loading={loading}
              disabled={loading || isBlocked}
            >
              Reset Password
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <div className="text-sm text-white flex items-center gap-2">
              <span className="flex flex-1 border-t h-0"></span>
              Or {isSignUp ? 'Register with' : 'Login with'}
              <span className="flex flex-1 border-t h-0"></span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                disabled={isBlocked || (isSignUp && !isMarkTick)}
                className="w-fit bg-white rounded-xl gap-2 text-black flex items-center justify-center hover:bg-white"
                onClick={() => {
                  if (isBlocked) {
                    setToastState?.({
                      showToast: true,
                      message: 'Access from your region is not allowed.',
                      status: 'error',
                    });
                    return;
                  }
                  if (isSignUp && !isMarkTick) {
                    setToastState?.({
                      showToast: true,
                      message:
                        'Please accept Terms of Use, Privacy Policy, and Age/State restriction.',
                      status: 'error',
                    });
                    return;
                  }
                  window.location.href =
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/api/v1/auth/sso/google';
                }}
              >
                <Image src={googlei} width={16} height={16} alt="Google" />
                <span>Google</span>
              </Button>

              <Button
                type="button"
                disabled={isBlocked || (isSignUp && !isMarkTick)}
                className="w-fit bg-white rounded-xl gap-2 text-black flex items-center justify-center hover:bg-white"
                onClick={() => {
                  if (isBlocked) {
                    setToastState?.({
                      showToast: true,
                      message: 'Access from your region is not allowed.',
                      status: 'error',
                    });
                    return;
                  }
                  if (isSignUp && !isMarkTick) {
                    setToastState?.({
                      showToast: true,
                      message:
                        'Please accept Terms of Use, Privacy Policy, and Age/State restriction.',
                      status: 'error',
                    });
                    return;
                  }
                  window.location.href =
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/api/v1/auth/sso/facebook';
                }}
              >
                <Image
                  src={facebook}
                  width={16}
                  height={16}
                  alt="Facebook"
                />
                <span>Facebook</span>
              </Button>
            </div>
          </div>
        )}

        <CustomDialog
          isOpen={dialogConfig.isOpen}
          onClose={() => setDialogConfig({ isOpen: false, type: null })}
          type={dialogConfig.type}
          loading={termsPrivacyLoading}
          data={dialogConfig.type === 'terms' ? termsData : privacyData}
        />
      </form>
    </div>
  );
};

export default UserForm;
