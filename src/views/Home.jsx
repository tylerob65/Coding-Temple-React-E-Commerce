import React, {Item, useState, useEffect} from 'react'
import { Container,Typography, Box, Grid, Button} from '@mui/material'
import ProductCard from '../components/ProductCard'

// import Item
export default function Home() {
  const [productList, setProductList] = useState([])

  const showProducts = () => {
    return (
        productList.map((product) => {
          return (
            <Grid item key={product.id}><ProductCard product={product}/></Grid>
          )
        })
    )}
  
  const getProducts = async () => {
    const res = await fetch('http://127.0.0.1:5000/products')
    const data = await res.json()
    if (data.status === "ok") {
      setProductList(data.products)
      showProducts()
    }
  }
  
  useEffect(() => {
    getProducts()
  },[])

  return (
    <div className='mainBody'>
        <Typography variant="h3">Welcome to DactylGoods</Typography>
        <Typography>Please browse our collection of high end electronics by clicking the cards below!</Typography>
        <Grid container justifyContent='space-around' alignItems="stretch">
        {showProducts()}
        </Grid>
    </div>
  )
}
