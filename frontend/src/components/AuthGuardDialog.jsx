// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getAccessToken } from '@/services/storageUtils';

// const publicRoutes = ['/login', '/signup'];

// export default function AuthGuardDialog({ children }) {
//   const router = useRouter();
//   const [authorized, setAuthorized] = useState(true);

//   useEffect(() => {
//     const token = !!getAccessToken();
//     const isPublic = publicRoutes.includes(pathname);

//     if (!token) {
//       if (!isPublic) {
//         console.log(
//           'Unauthenticated user on private route → redirecting to /login'
//         );
//         router.push('/login');
//         setAuthorized(false);
//       } else {
//         console.log('Unauthenticated user on public route → no redirect');
//         setAuthorized(true);
//       }
//     }
//   }, []);

//   if (!authorized) {
//     return null;
//   }

//   return children;
// }




'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAccessToken } from '@/services/storageUtils';

// Routes that don't require auth
const publicRoutes = ['/login', '/signup'];

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    const isPublic = publicRoutes.includes(pathname);

    // console.info('[AuthGuard]', { pathname, token, isPublic });

    if (!token) {
      if (!isPublic) {
        // console.log('🔐 Not authenticated → redirecting to /login');
        router.push('/login');
      } else {
        // console.log('✅ Public route → allow access');
        setAuthorized(true);
      }
    } else {
      if (['/login', '/signup'].includes(pathname)) {
        // console.log('✅ Authenticated → redirecting from auth page to /');
        router.push('/');
      } else {
        setAuthorized(true);
      }
    }
  }, [pathname]);

  // Show nothing or a loading spinner while checking auth
  if (!authorized && !publicRoutes.includes(pathname)) {
    return null;
  }

  return children;
}
