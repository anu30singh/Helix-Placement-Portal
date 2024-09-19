import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Card = ({ id, image, title, author, rating, reviews, price, oldPrice, showCartButton = true }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const itemToAdd = {
      id,
      title,
      author,
      rating,
      reviews,
      price,
      oldPrice,
      image
    };
    addToCart(itemToAdd);
    alert('Item added to cart')
    console.log(itemToAdd);
  };

  return (
    <div className="max-w-xs overflow-hidden rounded-lg shadow-lg bg-white/85">
      <img className="object-cover w-full h-48 mb-1 rounded-lg" src={image} alt={title} />
      <div className="px-4 py-3">
        <h3 className="mb-2 font-semibold text-md">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">{author}</p>
        <div className="flex items-center mb-2">
          <span className="mr-1 text-yellow-500 text-md">&#9733;</span>
          <span className="font-semibold text-gray-800 text-md">{rating}</span>
          <span className="ml-2 text-sm text-gray-500">({reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-green-600">${price}</span>
            <span className="ml-2 text-sm text-gray-400 line-through">${oldPrice}</span>
          </div>
          {showCartButton && (
            <FaShoppingCart onClick={handleAddToCart} size={20} className='cursor-pointer' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
