import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../redux/slices/cartSlice'


const Cart = () => {
    const navigate = useNavigate()
    const [cartTotal,setCartTotal] = useState(0)
    const useCart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(useCart?.length>0){
            setCartTotal(useCart?.map(item=>item.totalPrice).reduce((a1,a2)=>a1+a2))
        }
    },[useCart])

    const handleDecrementQuantity =(product) =>{
        if(product?.quantity>1){
            dispatch(decrementQuantity(product.id))
    }else{
        dispatch(removeCartItem(product.id))
    }
 }

 const checkOut =()=>{
    dispatch(emptyCart())
    alert("Order Confirmed...  Thank you for purchasing with us...")
    // redirect to home
    navigate('/')
  }

  return (
    <>
    <Header/>
    <div style={{paddingTop:'100px'}} className='px-5'>
        {
            useCart?.length>0 ?
            <>
            <h1 className='text-5xl font-bold text-blue-600'>Cart Summary</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
                <div className='col-span-2 border rounded p-5 shadow'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <td className='font-semibold'>#</td>
                                <td className='font-semibold'>Name</td>
                                <td className='font-semibold'>Image</td>
                                <td className='font-semibold'>Quantity</td>
                                <td className='font-semibold'>Price</td>
                                <td className='font-semibold'>...</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                useCart?.map((product,index)=>(
                                <tr>
                                <td>{index+1}</td>
                                <td>{product?.title}</td>
                                <td><img width={'70px'} height={'70px'} src={product?.thumbnail} alt="" /></td>
                                <td>
                                    <div className='flex'>
                                        <button onClick={()=>handleDecrementQuantity(product)} className='font-bold'>-</button>
                                        <input style={{width:'40px'}} type="text" className='border p-1 rounded mx-2' value={product?.quantity} readOnly />
                                        <button onClick={()=>dispatch(incrementQuantity(product?.id))} className='font-bold'>+</button>
                                    </div>
                                </td>
                                <td>$ {product?.totalPrice}</td>
                                <td><button onClick={()=>dispatch(removeCartItem(product?.id))} className='text-red-600'> <i className='fa-solid fa-trash'></i> </button></td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
        
                    <div className='float-right mt-5'>
                        <button onClick={()=>dispatch(emptyCart())} className='bg-red-600 rounded p-2 text-white'>EMPTY CART</button>
                        <Link to={'/'} className='bg-blue-600 ms-3 rounded p-2 text-white'>SHOP MORE</Link>
                    </div>
        
                </div>
                <div className='col-span-1'>
                    <div className='border rounded p-5 shadow'>
                        <h2 className='text-2xl font-bold my-4'>Total Amount : <span className='text-red-600'>{cartTotal}</span></h2>
                        <hr />
                        <button onClick={checkOut} className='bg-green-600 rounded p-2 text-white w-full mt-4'>Check Out</button>
                    </div>
                </div>
        
            </div>
            </>

            :

            <div className='flex justify-center items-center h-screen'>
             <img src="https://www.bing.com/th/id/OGC.97ce75452b2967689c882ce4a1d3c41d?pid=1.7&rurl=https%3a%2f%2fschoolville.com%2fassets%2fimg%2fempty-cart-illustration.gif&ehk=E5p%2bdBDOx6cO080Gh7yIFA71f4hL%2fZMevwjyuKHE4cI%3d" alt="" />
             <h1 className='text-3xl text-red-600'>Your Cart is empty!!!</h1>
            </div>
        }

    </div>
    </>
  )
}

export default Cart