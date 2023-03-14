import React from 'react';
import { useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { useAdsList } from '../../context/productList';
import './Post.css';

function Posts() {
  const {ads, viwProductDetail} = useAdsList()
  const navigate = useNavigate()

  const clickOnPost = (ad)=> {
    console.log(ad, 'ad')
    viwProductDetail(ad)
    navigate('/detailedview')
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            ads.map(ad=> {
              return <div onClick={()=>{clickOnPost(ad)}}
              className="card"
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={ad.imageUrl} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {ad.price}</p>
                <span className="kilometer">{ad.name}</span>
                <p className="name">{ad.category}</p>
              </div>
            </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
