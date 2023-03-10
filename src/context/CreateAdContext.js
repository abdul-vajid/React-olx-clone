import React, { createContext, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase/config';
import {  collection, addDoc } from 'firebase/firestore';

const CreateAdContext = createContext();

export const CreateAdContextProvider = ({ children }) => {
  const createNewAd = async (user, name, category, price, image) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      const adData = {
        name,
        category,
        price,
        userId: user.uid,
        imageUrl,
      };
      const adsCollectionRef = collection(db, 'ads');
      await addDoc(adsCollectionRef, adData);
    } catch (error) {
      console.log(error, 'err from');
    }
  };
  return (
    <CreateAdContext.Provider value={{ createNewAd }}>
      {children}
    </CreateAdContext.Provider>
  );
};

export function useCreateAd() {
  return useContext(CreateAdContext);
}
