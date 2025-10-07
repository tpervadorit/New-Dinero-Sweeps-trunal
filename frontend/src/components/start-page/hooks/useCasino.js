import { useEffect, useState } from 'react';
import { getAllGames } from '@/services/getRequests';

const useCasino = () => {
  const [gameData, setGameData] = useState([]);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState(null);

  const getGames = async () => {
    setGameLoading(true);
    setGameError(null);

    try {
      const response = await getAllGames();
      setGameData(response?.data?.categoryGames?.rows);
    } catch (err) {
      setGameError(err.message);
    } finally {
      setGameLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return {
    formateData: gameData,
    gameError,
    gameLoading,
  };
};

export default useCasino;
