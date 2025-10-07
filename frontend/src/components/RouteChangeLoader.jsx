'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStateContext } from '@/store';
import { getAccessToken } from '@/services/storageUtils';
import PageLoader from './PageLoader';

export default function RouteChangeLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'SET_ROUTE_LOADING', payload: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const originalPush = router.push;

    router.push = (...args) => {
      const token = getAccessToken();
      const publicRoutes = ['/', '/login', '/signup'];
      const destination =
        typeof args[0] === 'string' ? args[0] : args[0]?.pathname;

      if (!token && destination && !publicRoutes.includes(destination)) {
        window.location.href = '/login';
        return;
      }

      dispatch({ type: 'SET_ROUTE_LOADING', payload: true });
      return originalPush(...args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router, dispatch]);

  return state.routeLoading ? <PageLoader /> : null;
}
