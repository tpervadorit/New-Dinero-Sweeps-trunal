'use client';
import { useForm } from 'react-hook-form';
import { userSignUp, userLogin } from '@/services/postRequest';
import { addLoginToken } from '@/services/storageUtils';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStateContext } from '@/store';
import useGetUserDeatil from '@/common/hook/useGetUserDeatil';

const useUserAuth = ({ isSignUp = false, setToastState }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { dispatch } = useStateContext();
  const { getUser } = useGetUserDeatil();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  const { control, handleSubmit, setError } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (value) => {
    const apiCall = isSignUp ? userSignUp : userLogin;
    const payload = refCode ? { ...value, referralCode: refCode } : value;
    setLoading(true);
    try {
      const response = await apiCall(payload);
      const { data = {} } = response || {};

      const { user: userInfo, accessToken } = data || {};

      const token = isSignUp ? data?.user?.token : accessToken;

      dispatch({ type: 'SET_USER', payload: userInfo });

      addLoginToken(token);
      router.replace("/");
      setLoading(false);
      getUser();
      setToastState({
        showToast: true,
        message: `${isSignUp ? 'Signed Up' : 'Logged In'} Successfully`,
        status: 'success',
      });
      router.push('/');
    } catch (error) {
      setLoading(false);

      const fallbackMessage = 'Access denied, VPN  detected.';
      // Prefer backend geo/VPN block error if present
      const apiMessage =
        error?.response?.data?.error ||
        error?.errors?.message ||
        error?.message ||
        fallbackMessage;

      setToastState({
        showToast: true,
        message: apiMessage,
        status: 'error',
      });

      // Set form error for geo/VPN block or other errors
      setError('username', {
        type: 'manual',
        message: apiMessage,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    loading,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useUserAuth;
