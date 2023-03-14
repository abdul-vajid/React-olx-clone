import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const AdsListContext = createContext([]);

export const AdsListContextProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [productDetail, setProductDetail] = useState({})

  function viwProductDetail ({ad}){
    console.log(ad, "ad")
    if (ad) {
      setProductDetail(ad)
    }
  }

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const collectionRef = collection(db, "ads")
        const querySnapshot = await getDocs(collectionRef);
        const fetchedAds = [];
        querySnapshot.forEach((doc) => {
          fetchedAds.push({ id: doc.id, ...doc.data() });
        });
        setAds(fetchedAds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAds();
  }, []);

  return (
    <AdsListContext.Provider value={{ads, productDetail, viwProductDetail, setProductDetail}}>
      {children}
    </AdsListContext.Provider>
  );
};

export const useAdsList = () => useContext(AdsListContext);
