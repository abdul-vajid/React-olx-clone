import React from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { AdsListContextProvider } from '../context/productList';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <AdsListContextProvider>
        <Posts />
      </AdsListContextProvider>
      <Footer />
    </div>
  );
}

export default Home;

