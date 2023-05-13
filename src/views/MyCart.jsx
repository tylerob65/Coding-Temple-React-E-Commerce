import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyCart({user}) {
    
    const [cartInfo, setCartInfo] = useState({})
    const [showAlert, setShowAlert] =  useState(false)
    
    const getCartInfo = async () => {
        const res = await fetch(`http://127.0.0.1:5000/mycart/${user.id}`)
        const data = await res.json()
        
        const newCartInfo = {
            cartTotal:data.cartTotal,
            cart: data.cart,
        }
        if (data.status === "ok") {
            // setCartInfo(data.cart)
            setCartInfo(newCartInfo)
            showCart()
        }
    }

    const showCart = () => {
        if (Object.keys(cartInfo).length==0) {
            
        } else {
        return (
            cartInfo.cart.map((item)=>{
                return (
                    <TableRow key={item.item_id}>
                    <TableCell><img src={item.image_url} alt="" style={{height:100,objectFit:"contain"}}/></TableCell>
                    <TableCell>
                        <Link to={`/product/${item.item_id}`}>
                            {item.product_name}
                        </Link>
                    </TableCell>
                    <TableCell>{item.item_quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.total_item_cost}</TableCell>
                        <TableCell>
                            <form name={item.item_id} onSubmit={handleRemoveFromCart} productid={item.item_id} key={item.item_id}>
                                <Button type="submit">Remove</Button>
                            </form>
                        </TableCell>
                    </TableRow>
                )
            })
            )
        }
    }

    useEffect(() => {
        getCartInfo()
        showCart()
    }, [])

    const handleRemoveFromCart = async (e) => {
        e.preventDefault();
    
        const productId = e.target.name
        const body = {
            productId: productId,
            userId: user.id,
        }
            const url = `http://127.0.0.1:5000/removeitem/${productId}`
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
        if (data.status === 'ok') {
            getCartInfo()
            showCart()
        }
        }
    const handleEmptyCart = async (e) => {
        e.preventDefault();
        const body = {
            userId: user.id,
        }
        const url = "http://127.0.0.1:5000/emptycart"
        const options = {
            method: "POST",
            headers: {
                // "Content-Type": 'application/json',
                Authorization: `Bearer ${user.apitoken}`
            },
            body: JSON.stringify(body)
        }
        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok') {
            getCartInfo()
            showCart()
        }
    }

    // const getAPIKey = () => {
    //     return (
    //         <input key={ user.apitoken } name="APIKEY" value={user.apitoken}/>

    //     )
    // }

    // const handleCheckout = async (e) => {
    //     handleEmptyCart(e);
    //     setShowAlert(true);
    // }

    const handleCheckout = async (e) => {
        e.preventDefault();
        const body = {
            userId: user.id,
        }
        const url = "http://127.0.0.1:5000/checkout"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${user.apitoken}`,
                // "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body)
        }
        // const res = await fetch(url, options);
        // try {
        //     res = await fetch(url, options);
        // }
        // catch (e) {
        //     console.log(e)
        // }
        
        const resData = await axios.post(url,body,{headers:options.headers})
        console.log(resData)
        
        // console.log(res)
        // if (res.redirected) {
        //     window.location = res.url
        // }
        // const data = await res.json();
        // if (data.status === 'ok') {
        //     getCartInfo()
        //     showCart()
        // }

    }

    

    return (
    <>
    {showAlert?
    <Alert onClose={() => { setShowAlert(false)}}>You successfully Checked Out! Thanks for shopping</Alert>:
    <></>
    }
    
    <Container>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price Per Unit</TableCell>
                    <TableCell>Total Item Cost</TableCell>
                    <TableCell>Remove From Cart</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {showCart()}
            </TableBody>
        </Table>
    </TableContainer>
    </Container>
    <br />
        {Object.keys(cartInfo).length == 0 ?
        <>    
        </>
        :
        <>  
            {Object.keys(cartInfo.cart).length==0?
            <Container sx={{textAlign:"center"}}>
            <Typography> Cart is Empty, Please Continue Shopping</Typography>
            </Container>
            :
            <>
            <Container>
            <Typography variant='h5'> <i>Total Cart Price: {cartInfo.cartTotal}</i></Typography>
            </Container>
            <Container sx={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            <br />
            <form onSubmit={handleCheckout}>
            <Button type="submit" variant="contained" color="success" sx={{ width: 150 }}>Checkout</Button>
            </form>
            <br />
            <form onSubmit={handleEmptyCart}>
            <Button type="submit" variant="contained" color="error" sx={{ width: 150 }}>Empty Cart</Button>
            </form>
            <br />
            {/* <form onSubmit={handleCheckout}> */}
            <form action="http://127.0.0.1:5000/checkout" method="POST">
                {/* <input hidden type="text" name="apitoken" value={user.apitoken}/> */}
                {/* <input type="text" name="apitoken" value={user.apitoken}/> */}
                {/* {getAPIKey()} */}
                <input key={user.apitoken} name="apitoken" value={user.apitoken} />
                <Button type="submit" variant="contained" color="error" sx={{ width: 150 }}>Checkout Cart</Button>
            </form>
            </Container>
            </>
            }
        </>
    }
    
    </>
  )
}


