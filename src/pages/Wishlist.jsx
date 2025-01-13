import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishlistSlice'

const Wishlist = () => {
  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)


  const handleCart =(product)=>{
    dispatch(removeItem(product.id))
    dispatch(addToCart(product))
    const existingProduct = userCart?.find(item=>item?.id==id)
    if(existingProduct){
      alert("Product Quantity is Incrementing!!!")
    }else{
      alert("Product added to cart!")
    }
   }


  return (
    <>
    <Header/>
    <div style={{paddingTop:'100px'}} className='px-5'>
       {
        userWishlist?.length>0 ?
        <>
        <h1 className='text-4xl font-bold text-red-600'>My Wishlist</h1>
        <div className='grid grid-cols-4 gap-4'>
        {
          userWishlist?.map(product=>(
            <div className='rounded border p-2 shadow'>
            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
              <div className='text-center'>
               <h3 className='text-xl font-bold'>{product?.title}</h3>
                <div className='flex justify-evenly mt-3'>
                <button onClick={()=>dispatch(removeItem(product?.id))} className='text-xl'><i class="fa-solid fa-heart-circle-xmark text-red-500"></i></button>
                <button onClick={()=>handleCart(product)} className='text-xl'><i class="fa-solid fa-cart-plus text-green-700"></i></button>
              </div>
            </div>
          </div>
          ))
        }
      </div>
        </>
        :
        <div className='flex justify-center items-center h-screen'>
          <img src="https://www.bing.com/th/id/OGC.97ce75452b2967689c882ce4a1d3c41d?pid=1.7&rurl=https%3a%2f%2fschoolville.com%2fassets%2fimg%2fempty-cart-illustration.gif&ehk=E5p%2bdBDOx6cO080Gh7yIFA71f4hL%2fZMevwjyuKHE4cI%3d" alt="" />
          <h1 className='text-3xl text-red-600'>Your wishlist is empty!!!</h1>
        </div>
       }
    </div>
    </>
  )
}

export default Wishlist