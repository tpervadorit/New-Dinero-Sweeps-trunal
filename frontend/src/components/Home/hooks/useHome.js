// import { gamesByCategory } from '@/services/getRequests';
// import { useEffect, useState } from 'react';

// function useHome() {
//   const [gameData, setGameData] = useState([]);
//   const [gameLoading, setGameLoading] = useState(false);
//   const [gameError, setGameError] = useState(null);
//   const [search, setSearch] = useState('');

//   const getGames = async () => {
//     setGameLoading(true);
//     setGameError(null);
//     try {
//       const payload = search === "" ? {} : { search };
//       const response = await gamesByCategory(payload);
//       setGameData(() => {
//         const updatedData = response?.data?.casinoGames || [];
//         return updatedData;
//       });
//     } catch (err) {
//       setGameError(err.message);
//     } finally {
//       setGameLoading(false);
//     }
//   };

//   useEffect(() => {
//     getGames();
//   }, [search]);

//   return {
//     gameData,
//     gameLoading,
//     gameError,
//     setSearch,
//   };
// }

// export default useHome;

import { gamesByCategory } from '@/services/getRequests';
import { useEffect, useState, useRef } from 'react';

function useHome() {
  const [gameData, setGameData] = useState([]);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState(null);
  const [search, setSearch] = useState('');

  const debounceTimeoutRef = useRef(null); // to store timeout reference

  const getGames = async (searchQuery) => {
    setGameLoading(true);
    setGameError(null);
    try {
      const payload = searchQuery === "" ? {} : { search: searchQuery };
      const response = await gamesByCategory(payload);
      const updatedData = response?.data?.casinoGames || [];
      setGameData(updatedData);
    } catch (err) {
      setGameError(err.message);
    } finally {
      setGameLoading(false);
    }
  };

  useEffect(() => {
    // Clear previous timeout if user types again
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new debounce timeout
    debounceTimeoutRef.current = setTimeout(() => {
      getGames(search);
    }, 500); // debounce delay (500ms)

    // Cleanup on unmount
    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [search]);

  return {
    gameData,
    gameLoading,
    gameError,
    setSearch,
  };
}

export default useHome;