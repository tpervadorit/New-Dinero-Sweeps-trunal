import { getProviderList } from '@/services/getRequests';
import { useEffect, useState } from 'react';
import { Providers } from '../constants';

const useProvider = () => {
  const [providerOptions, setProviderOptions] = useState([]);
  const [providerLoading, setProviderLoading] = useState(false);

  const getProviderGames = async () => {
    setProviderLoading(true);
    try {
      const response = await getProviderList();
      const options = response?.data?.count
        ?.map((item, i) => ({
          name: item?.name?.EN,
          id: item?.id,
          color: `hsl(${(i * 30) % 360}, 70%, 50%)`,
        }))
        .filter((option) => option.name && option.id);
      setProviderOptions([...options]);
    } catch (err) {
      const options = Providers?.map((item, i) => ({
        name: item?.name?.EN,
        id: item?.id,
        color: `hsl(${(i * 30) % 360}, 70%, 50%)`,
      })).filter((option) => option.name && option.id);
      setProviderOptions([...options]);
      console.log(err.message);
    } finally {
      setProviderLoading(false);
    }
  };

  useEffect(() => {
    getProviderGames();
  }, []);

  return {
    providerLoading,
    providerOptions,
  };
};

export default useProvider;
