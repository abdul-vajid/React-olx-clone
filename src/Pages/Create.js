import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { CreateAdContextProvider } from '../context/CreateAdContext';

const CreatePage = () => {
  return (
    <CreateAdContextProvider>
      <Fragment>
        <Header />
        <Create />
      </Fragment>
    </CreateAdContextProvider>
  );
};

export default CreatePage;
