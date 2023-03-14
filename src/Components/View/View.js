import React from 'react';
import { useAdsList } from '../../context/productList';

import './View.css';
function View() {
  const {productDetail} = useAdsList()
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src="../../../Images/R15V3.jpg"
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetail.price} </p>
          <span>{productDetail.name}</span>
          <p>{productDetail.category}</p>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
