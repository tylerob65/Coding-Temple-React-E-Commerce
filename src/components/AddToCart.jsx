import React, {useState,useEffect} from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AddToCart({productId,user}) {
    
    const handleSubmit = async (e) => {
        
        // const [addSuccessful,setAddSuccessful] = useState(false)
        // const navigate = useNavigate()

        // useEffect(() => {
        //     if (addSuccessful) {
        //         setAddSuccessful(false)
        //         navigate("/")
        //     }
        // }, [addSuccessful])
        e.preventDefault();
        
        
        console.log("hi")

        const body = {
            productId:productId,
            userId:user.id,
        }
        const url = `http://127.0.0.1:5000/additem/${productId}`
        const options = {
            method:"POST",
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
        <form onSubmit={handleSubmit}>
            <Button type="submit">Add To Cart</Button>
        </form>

    
  )
}
