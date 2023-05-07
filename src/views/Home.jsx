import React, {Item}from 'react'
import { Container,Typography, Box, Grid} from '@mui/material'
import ProductCard from '../components/ProductCard'
// import Item
export default function Home() {
  return (
    <div className='mainBody'>
        <Typography variant="h2">Welcome</Typography>
        <Grid container justifyContent='space-around'>
              <Grid item><ProductCard /></Grid>
              <Grid item><ProductCard /></Grid>
              <Grid item><ProductCard /></Grid>
              <Grid item><ProductCard /></Grid>
              <Grid item><ProductCard /></Grid>
              <Grid item><ProductCard /></Grid>
              
            
            
            {/* <Grid item><Item><ProductCard /></Item></Grid> */}
            {/* <Item><ProductCard /></Item>
            <Item><ProductCard /></Item> */}
            {/* <ProductCard/>
            <ProductCard/> */}
        </Grid>
        
        
    </div>
  )
}
