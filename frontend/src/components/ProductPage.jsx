import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showCartItems = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/items/');
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const addToCart = async (item) => {
        if (cartItems.some(existingItem => existingItem.id === item.id)) return alert("Item already added!");
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (itemToRemove) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemToRemove.id));
    };


    return (
        <div className="container mx-auto p-4">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-center mb-8">
                Our Products
                <span onClick={() => showCartItems()} className="flex cursor-pointer">
                    Cart
                    <span className="bg-pink-500 rounded-full w-10 h-10 text-white font-semibold ml-2">
                        {cartItems.length}
                    </span>
                </span>
            </h1>
            {/* Modal Section */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between '>
                        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
                        {/* Close Modal Button */}
                        <div className="text-center">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                            >
                                X
                            </button>
                        </div>
                        </div>
                        <div className="space-y-4">
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center border-b py-2"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} className="w-16 h-16 object-cover" alt="" />
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">${item.price}</p>
                                        </div>
                                        <p className='cursor-pointer' onClick={() => removeFromCart(item)}>X</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No items in the cart.</p>
                            )}
                        </div>
                            
                        <div className="text-center mt-5">
                            <button
                                onClick={() => console.log(cartItems)}
                                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-900"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Grid of product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                    >
                        {/* Product Image */}
                        <img
                            src={item.image || '/default-image.jpg'} // Default image in case the item doesn't have one
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />

                        <div className="p-4">
                            {/* Product Name */}
                            <h2 className="text-xl font-semibold text-gray-800 truncate">{item.name}</h2>

                            {/* Product Description */}
                            <p className="text-gray-600 mt-2 text-sm">{item.description}</p>

                            {/* Price and Buttons */}
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-semibold text-gray-800">
                                    ${item.price}
                                </span>
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ProductPage;
