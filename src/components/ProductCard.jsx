import React, {useState} from 'react'
import { Card, CardMedia, Typography, CardActionArea, Container} from '@mui/material'

export default function ProductCard({product}) {
    const [hoverElevation,setElevation] = useState(4)
    // const hoverCardElevation = () => {
    //     setElevation({shadow:3})
    // }
    // const onMouseOut = () => setState({shadow:1})
    return (
        
    <Card 
    elevation={hoverElevation}
    onMouseOver={() => setElevation(10)}
    onMouseOut={() => setElevation(4)}
    sx={{
        maxWidth:300,
        transition:"box-shadow 0.5s",
        my:1,
        mx:2,
        borderColor:"blue"
        
    }}
    >
        <CardActionArea sx={{p:1}}>
        <CardMedia
        component="img"
        image={product.image_url}
        height="100"
        sx={{
            objectFit:"contain",
            mt:1,
            mb:1,
        }}
        />

        <Typography variant='h6' sx={{textAlign:"center"}} >{product.product_name}</Typography>
        <Typography sx={{textAlign:"center"}}>{product.price}</Typography>
        </CardActionArea>

        
    </Card>

  )
}
