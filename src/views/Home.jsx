import React, {Item, useState, useEffect} from 'react'
import { Container,Typography, Box, Grid, Button} from '@mui/material'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
// import Item
export default function Home() {
  const [productList, setProductList] = useState([])

  const showProducts = () => {
    return (
        productList.map((product) => {
          return (
            <Grid item><ProductCard product={product}/></Grid>
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
        <Typography variant="h2">Welcome</Typography>
        <Grid container justifyContent='space-around'>
        {showProducts()}
        </Grid>
    </div>
  )
}
