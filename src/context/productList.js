import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection } from 'firebase/firestore';

const AdsListContext = createContext([]);

export const AdsListContextProvider = ({ children }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        console.log(2);
        const adsRef = collection(db, 'ads');
        console.log(3);
        const adsSnapshot = await adsRef.get();
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(adsList, 'adslistfrom context');
        setAds(adsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAds();
  }, []);

  return (
    <AdsListContext.Provider value={ads}>{children}</AdsListContext.Provider>
  );
};

export const useAdsList = () => useContext(AdsListContext);
