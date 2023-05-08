import React, { Item, useState, useEffect } from 'react'
import { Container, Typography, Box, Grid, Button } from '@mui/material'
export default function Home() {
    const [productList, setProductList] = useState([])

    const showProducts = () => {
        console.log(productList)
        const test = [1, 2, 3]
        return (
            test.map((product) => {
                return <h2>Hi</h2>
            })
        )
    }
    
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
        showProducts()
    }, [])


    return (
        <div className='mainBody'>
            <Typography variant="h2">Welcome</Typography>
            {showProducts()}
            <Button onClick={showProducts}>Hello</Button>
        </div>
    )
}
