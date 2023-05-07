import React from 'react'
import { Container,Typography } from '@mui/material'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    <div className='mainBody'>
        <Typography variant="h2">Welcome</Typography>
        <ProductCard></ProductCard>
        
    </div>
  )
}
