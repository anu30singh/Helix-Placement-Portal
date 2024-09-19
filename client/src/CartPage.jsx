import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { MdDelete } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = cart.reduce((acc, item) => acc + ((item.oldPrice - item.price) * item.quantity), 0);
  const discountedTotal = totalPrice + totalDiscount;
  const discountPercentage = 100 - ((totalPrice / discountedTotal) * 100);

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/create-payment`, {
        currency_code: 'USD',
        value: totalPrice.toFixed(2)
      });
      // Make sure response has approval_url before navigating
      if (response.data && response.data.approval_url) {
        window.location.href = response.data.approval_url;
      } else {
        console.error('No approval URL in the response');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  

  return (
    <div className='w-full h-full flex flex-col justify-start items-start pl-12 pr-8 py-4 bg-[#17181E]'>
      <h2 className='text-white font-semibold mt-8 montserrat-font text-[38px]'>Shopping Cart</h2>
      <h3 className='text-white font-medium mt-3 montserrat-font text-[22px] ml-[2px]'>{cart.length} courses in Cart</h3>
      {cart.length > 0 ? (
        <div className='flex items-start justify-between w-full pr-12'>
          <div className="flex flex-col items-start justify-start w-full h-full pl-10 pr-6 mt-10 mb-4 gap-x-2 gap-y-5">
            {cart.map(item => {
              const imageUrl = `${item.image}`;
              console.log('Image URL:', imageUrl);

              return (
                <div key={item.id} className="flex items-start justify-between w-full h-full pt-5 pr-24 mb-6 mr-6 border-t border-white/40">
                  <div className="flex items-start justify-between w-full max-w-[700px] h-full">
                    <div className="flex items-start justify-start w-full h-full gap-3">
                      <img src={imageUrl} alt="" className="object-contain mb-1 rounded-lg" width={200} height={100} />
                      <div className="flex flex-col items-start justify-start w-[800px] h-full gap-3">
                        <h3 className="mb-2 font-semibold text-white montserrat-font text-[20px]">{item.title}</h3>
                        <p className="mb-2 font-medium text-white text-md montserrat-font">By {item.author}</p>
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-white text-md">{item.rating}</span>
                          <span className="ml-1 text-yellow-500 text-md">&#9733;</span>
                          <span className="ml-2 text-sm text-white">({item.reviews} ratings)</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-start justify-start w-full h-full ">
                      <div className="flex flex-col items-start justify-start w-[300px] h-full gap-3">
                        <p onClick={() => removeFromCart(item.id)} className="text-purple-500 font-normal montserrat-font cursor-pointer text-[16px]">Remove</p>
                        <p className="text-purple-500 font-normal montserrat-font w-full text-[16px]">Save for Later</p>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full h-[120px] gap-3">
                        <div className="flex items-center gap-2">
                        <p className="text-purple-500 font-medium montserrat-font text-[20px]">${item.price}</p>
                        <MdDiscount size={20} className='text-purple-500 mt-[2px]'></MdDiscount>
                        </div>
                        <p className="text-white/70 font-normal montserrat-font text-[18px] line-through">${item.oldPrice}</p>
                      </div>
                      <div className="absolute flex items-center bottom-2 left-32">
                        <button 
                          onClick={() => decreaseQuantity(item.id)} 
                          className={`px-2 py-1 text-white bg-gray-600 rounded-l ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-gray-800 bg-white">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)} 
                          className="px-2 py-1 text-white bg-gray-600 rounded-r cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button onClick={clearCart} className='px-4 py-2 mt-4 font-serif font-medium text-white bg-red-500 rounded'>
              Clear Cart
            </button>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 mt-[30px] mr-8">
            <h3 className="font-semibold text-purple-500 montserrat-font text-[22px]">Total :</h3>
            <h3 className='text-white font-bold montserrat-font text-[38px]'>${totalPrice.toFixed(2)}</h3>
            <h3 className='text-white font-semibold line-through montserrat-font text-[22px]'>${discountedTotal.toFixed(2)}</h3>
            <h3 className='text-white font-semibold montserrat-font text-[22px]'>%{discountPercentage.toFixed(2)} off</h3>
            <button 
              onClick={handleCheckout} 
              className='text-white bg-purple-500 px-7 py-2 font-semibold mt-3 rounded-lg montserrat-font text-[14px]'
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start w-full h-full gap-6">
          <img src="./cartz.png" alt="Empty Cart" className="object-contain bg-[#17181E]" width={400} height={300} />
          <p className='text-white font-semibold mt-1 montserrat-font text-[28px]'>Your cart is empty</p>
          <button className='text-white bg-purple-500 px-6 py-4 font-semibold mt-2 rounded-lg montserrat-font text-[14px]'>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
