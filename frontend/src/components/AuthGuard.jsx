'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAccessToken } from '@/services/storageUtils';
import PageLoader from './PageLoader';

const publicRoutes = ['/', '/login', '/signup'];

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const rawToken = getAccessToken();
      const token = typeof rawToken === 'string' && rawToken.trim() !== '';
      const isPublic = publicRoutes.includes(pathname);

      // console.info('[AuthGuard]', { pathname, token, isPublic });

      if (!token) {
        if (!isPublic) {
          // console.log('Unauthenticated user on private route → redirecting to /login');
          router.push('/login');
        } else {
          // console.log('Unauthenticated user on public route → no redirect');
        }
      } else {
        if (['/login', '/signup'].includes(pathname)) {
          // console.log('Authenticated user on auth route → redirecting to /');
          router.push('/');
        } else {
          // console.log('Authenticated user on protected route → no redirect');
        }
      }

      setAuthChecked(true);
    };

    checkAuth();
  }, [pathname]);

  if (!authChecked && !publicRoutes.includes(pathname)) {
    return <PageLoader />
  }

  return children;
}
