import React from 'react'
import { Typography,Container, Box, Button } from '@mui/material'

export default function ProductPage() {
  return (
    <div className='mainBody'>
        <Container sx={{display:"flex",alignItems:"center",flexDirection:"column"}}>
        <Typography variant='h3' textAlign={"center"}>Product</Typography>
            <br /> 
            <Box
            component="img"
            src="https://m.media-amazon.com/images/I/91UsHjAPTlL.__AC_SY300_SX300_QL70_FMwebp_.jpg"
            alt=""
            sx= {{maxWidth:400}}
            />
            <br />
            <Box>
                <Typography variant="p">Here is a drescription of the product, you would like to buy it because it is a good productHere is a drescription of the product, you would like to buy it because it is a good product</Typography>
            </Box>
            <Button variant='contained'>Add to cart</Button>
        </Container>
    </div>
  )
}
