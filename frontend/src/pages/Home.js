import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
const Home = () => {
  return (
    <div>
    <CategoryList/>
    <BannerProduct/>

    <HorizontalCardProduct category={"gifts_souvenirs"} heading={"gifts"}/>
    <HorizontalCardProduct category={"olive_wood_products"} heading={"wood"}/>
    <VerticalCardProduct category={"leather_goods"} heading={"leather"}/>
    </div>
  )
}

export default Home
