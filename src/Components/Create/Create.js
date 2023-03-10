import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import Loading from '../loading/loading';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { useCreateAd } from '../../context/CreateAdContext';
import { UserAuth } from '../../context/AuthContext';


const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const {user} = UserAuth()
  const {createNewAd} = useCreateAd()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const stringRegex = /^[a-zA-Z0-9_\- ]{2,50}$/
    const priceRegex = /^[0-9]{1,12}$/
    try {
      if (!stringRegex.test(name)) {
        setErrMsg('Name is not valid')
        setShowErr(true)
        return false
      } else if (!stringRegex.test(category)) {
        setErrMsg('Category is not valid')
        setShowErr(true)
        return false
      } else if (!priceRegex.test(price)) {
        setErrMsg('Price is not valid')
        setShowErr(true)
        return false
      } else if (!image || image.type !== "image/png" && image.type !== "image/jpeg") {
        setErrMsg('Upload a valid image file (JPEG or PNG)');
        setShowErr(true);
        return false;
      } else{
        setIsloading(true)
        setShowErr(false);
        console.log('in esle block of handle submit');
        await createNewAd(user, name, category, price, image)
        setIsloading(false)
      }
    } catch (error) {
      console.log(error, "error from handleSubmit's catch")
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {
            isLoading && <Loading />
          }
          {
            showErr && <ErrorAlert errMsg={errMsg} />
          }
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              placeholder="Honda CBR650"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              placeholder="Super bike"
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input" type="number" id="fname" name="Price" placeholder='500000'
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <br />
            <input className='inputimg' type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            <br/>
            {
              image && <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            }
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
