import React from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'
import { AdsListContextProvider } from '../context/productList'

function ViewPost(props) {
    return (
        <div>
            <AdsListContextProvider>
                <Header />
                <View />
            </AdsListContextProvider>
        </div>
    )
}

export default ViewPost
