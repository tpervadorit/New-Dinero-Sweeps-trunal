'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePassword from '../../hooks/usePassword';
import { Controller } from 'react-hook-form';
import { eye, eyeOff } from '@/assets/svg';
import Image from 'next/image';
import CustomToast from '@/common/components/custom-toaster';

const Password = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    watch,
    message,
    setShowToast,
    showToast,
    status,
    loading,
  } = usePassword();
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <section className="rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Current Password */}
          <div className="mb-2">
            <div className="text-white font-bold mb-2.5">
              Current Password <span className="text-red-500">*</span>
            </div>
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Please enter your Current password' }}
              render={({ field, fieldState }) => {
                const error = fieldState?.error;
                return (
                  <>
                    <div className="flex items-center space-x-2 relative">
                      <Input
                        type={
                          showPassword.currentPassword ? 'text' : 'password'
                        }
                        placeholder="Enter current password"
                        className={`bg-neutral-800 w-[100%] ${error && 'border-red-500'}`}
                        {...field}
                      />
                      <div
                        onClick={() =>
                          togglePasswordVisibility('currentPassword')
                        }
                        className="absolute right-3 cursor-pointer text-gray-500"
                      >
                        {showPassword.currentPassword ? (
                          <Image src={eyeOff} alt="eye-off" />
                        ) : (
                          <Image src={eye} alt="eye" />
                        )}
                      </div>
                    </div>
                    {error && (
                      <div className="text-red-500 text-sm">
                        {error.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>

          {/* New Password */}
          <div className="mb-2">
            <div className="text-white font-bold mb-2.5">
              New Password <span className="text-red-500">*</span>
            </div>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: 'Please enter your New Password',
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                  message:
                    'Password must be 6 characters and include at least one uppercase, lowercase letter, number, and special character.',
                },
              }}
              render={({ field, fieldState }) => {
                const error = fieldState?.error;
                return (
                  <>
                    <div className="flex items-center space-x-2 relative">
                      <Input
                        type={showPassword.newPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className={`bg-neutral-800 w-[100%] ${error && 'border-red-500'}`}
                        {...field}
                      />
                      <div
                        onClick={() => togglePasswordVisibility('newPassword')}
                        className="absolute right-3 cursor-pointer text-gray-500"
                      >
                        {showPassword.newPassword ? (
                          <Image src={eyeOff} alt="eye-off" />
                        ) : (
                          <Image src={eye} alt="eye" />
                        )}
                      </div>
                    </div>
                    {error && (
                      <div className="text-red-500 text-sm">
                        {error.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>

          {/* Confirm New Password */}
          <div className="mb-2">
            <div className="text-white font-bold mb-2.5">
              Confirm New Password <span className="text-red-500">*</span>
            </div>
            <Controller
              control={control}
              name="confirmNewPassword"
              rules={{
                required: 'Please enter your Confirm New Password',
                validate: (value) =>
                  value === watch('newPassword') || 'Passwords do not match',
              }}
              render={({ field, fieldState }) => {
                const error = fieldState?.error;
                return (
                  <>
                    <div className="flex items-center space-x-2 relative">
                      <Input
                        type={
                          showPassword.confirmNewPassword ? 'text' : 'password'
                        }
                        placeholder="Confirm new password"
                        className={`bg-neutral-800 w-[100%] ${error ? 'border-red-500' : ''}`}
                        {...field}
                      />
                      <div
                        onClick={() =>
                          togglePasswordVisibility('confirmNewPassword')
                        }
                        className="absolute right-3 cursor-pointer text-gray-500"
                      >
                        {showPassword.confirmNewPassword ? (
                          <Image src={eyeOff} alt="eye-off" />
                        ) : (
                          <Image src={eye} alt="eye" />
                        )}
                      </div>
                    </div>
                    {error && (
                      <div className="text-red-500 text-sm">
                        {error.message}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-0 p-4 flex justify-center">
          {/* <Button className="bg-gray-500 py-2 text-white rounded hover:bg-gray-600 mr-2">
                        Forget Password?
                    </Button> */}
          <Button
            disabled={loading}
            loading={loading}
            type="submit"
            className="bg-red-500 py-2 text-white rounded-full hover:bg-red-600"
          >
            Submit
          </Button>
        </div>
      </form>
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
        status={status}
      />
    </section>
  );
};

export default Password;
