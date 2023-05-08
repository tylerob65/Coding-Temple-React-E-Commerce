import React, {useEffect, useState} from 'react'
import { Typography, Container, Box, Button, CircularProgress } from '@mui/material'
import { useParams, Link } from 'react-router-dom'

export default function ProductPage() {
  const {productId} = useParams()
  
  const [productInfo, setProductInfo] = useState({})
  
  const getProductInfo = async () => {
    const res = await fetch(`http://127.0.0.1:5000/product/${productId}`)
    const data = await res.json()
    if (data.status === "ok") {
      setProductInfo(data.product_info)
    }
  }
  useEffect(() => {
    getProductInfo()
    console.log(productId)
  },[])


  return (
    <div className='mainBody'>
      {productInfo?
        <Container sx={{display:"flex",alignItems:"center",flexDirection:"column"}}>
        <Typography variant='h3' textAlign={"center"}>{productInfo.product_name}</Typography>
            <br /> 
            <Box
            component="img"
            src={productInfo.image_url}
            alt=""
            sx= {{maxWidth:400}}
            />
            <br />
            <Box>
          <Typography variant="p">{productInfo.description}</Typography>
            </Box>
            <Box>
            <Typography variant="p"><br /> <b>{productInfo.price}</b><br/> <br /> </Typography>
            </Box>
            
            <Button variant='contained'>Add to cart</Button>
        </Container>
        : <CircularProgress/>
        }
    </div>
  )
}
