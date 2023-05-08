import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MyCart({user}) {
    
    const [cartInfo, setCartInfo] = useState([])
    
    const getCartInfo = async () => {
        const res = await fetch(`http://127.0.0.1:5000/mycart/${user.id}`)
        const data = await res.json()
        if (data.status === "ok") {
            setCartInfo(data.cart)
            showCart()
        }
    }

    const showCart = () => {
        return (
            cartInfo.map((item)=>{
                return (
                    <>
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
                                    <Button type="submit">Remove From Cart</Button>
                                </form>
                            </TableCell>
                    </TableRow>
                    </>
                )
            })
        )
    }

    useEffect(() => {
        getCartInfo()
        showCart()
    }, [])

    const handleRemoveFromCart = async (e) => {
        e.preventDefault();
        console.log("got to handleRemoveFromCart")
    
        const productId = e.target.name
        console.log(e.target.name)
        console.log(productId)
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
        console.log(data)
        if (data.status === 'ok') {
            getCartInfo()
            showCart()
        }
        }
    const handleEmptyCart = async (e) => {
        e.preventDefault();
        console.log("got to handleEmptyCart")
        const body = {
            userId: user.id,
        }
        const url = "http://127.0.0.1:5000/emptycart"
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
            getCartInfo()
            showCart()
        }

    }
    


  return (
    <>
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
    <br />
        {Object.keys(cartInfo).length == 0 ?
        <>
        <Container sx={{textAlign:"center"}}>Cart Empty</Container>
        </>
        :
        <>
        <br />
        <Container sx={{alignItems:"center",display:"flex",flexDirection:"column"}}>
        <form onSubmit={handleEmptyCart}>
            <Button type="submit" variant="contained" color="error">Empty Cart</Button>
        </form>
        </Container>
            
        </>
    }
    
    </>
  )
}

