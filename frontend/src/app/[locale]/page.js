import { cookies } from 'next/headers';
import { decryptCredentials } from '@/services/storageUtils';
import Home from './Home';
import AppLayout from './(app)/layout';
import HomePage from '@/components/Home/components';

export default async function Page() {
  const cookieStore = cookies();
  const rawToken = cookieStore.get('access-token')?.value;

  const token = rawToken ? decryptCredentials(rawToken) : null;

  return token ? (
    <AppLayout>
      <HomePage />
    </AppLayout>
  ) : (
    <Home />
  );
}
