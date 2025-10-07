'use client';
import { removeLoginToken } from '@/services/storageUtils';
import { useStateContext } from '@/store';

const useLogout = ({ handleClick }) => {
  const {
    state: { user },
  } = useStateContext();
  const onClickLogout = async () => {
    removeLoginToken();
    handleClick();
    window.location.href = '/login';
  };

  return { onClickLogout, userName: user?.username };
};
export default useLogout;
