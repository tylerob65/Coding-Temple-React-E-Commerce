import React, {useEffect, useState} from 'react'
import { Typography, Container, Box, Button, CircularProgress } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import AddToCart from '../components/AddToCart'

export default function ProductPage({user}) {
  const {productId} = useParams()
  
  const [productInfo, setProductInfo] = useState({})
  
  const getProductInfo = async () => {
    // e.preventDefault();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const [addSuccessful,setAddSuccessful] = useState(false)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (addSuccessful) {
    //         setAddSuccessful(false)
    //         navigate("/")
    //     }
    // }, [addSuccessful])

    console.log("hi")

    const body = {
      productId: productId,
      userId: user.id,
    }
    const url = `http://127.0.0.1:5000/additem/${productId}`
    const options = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.apitoken}`
      },
      body: JSON.stringify(body)
    }
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data)
    if (data.status === 'ok') {
      // setAddSuccessful(true)
    }


  }


  return (
    <div className='mainBody'>
      {Object.keys(productInfo).length!=0?
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
        </Container>
          :
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress sx={{ margin: "auto" }} />
        </Container>
        }
      {Object.keys(user).length != 0 && Object.keys(productInfo).length != 0 ?   
        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <form onSubmit={handleSubmit}>
            <Button type="submit" variant='contained'>Add To Cart</Button>
          </form>
        </Container>
        :<>
        </>
        }
      
    </div>
  )
}
