import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ItemDetail = () => {
    const { state } = useLocation();
    const { item } = state || {};

    const [quantity, setQuantity] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handleBuyNow = () => {
        alert(`You are purchasing ${quantity} ${item.name}(s) for $${item.price * quantity}`);
    };

    // Move to the next image
    const nextImage = () => {
        if (currentIndex < item.images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Move to the previous image
    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-2xl">
            {/* Item Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{item.name}</h1>

            {/* Image Gallery - Single Image with Navigation */}
            <div className="relative mb-8">
                {/* Image container */}
                <div className="relative">
                    {/* If no images are provided, show "No Image Available" message */}
                    {item.images && item.images.length > 0 ? (
                        <img
                            src={item.images[currentIndex]?.image || '/images/defaultImage.png'}
                            alt={`${item.name} ${currentIndex + 1}`}
                            className="w-full h-96 object-cover rounded-xl shadow-md"
                        />
                    ) : (
                        <div className="w-full h-96 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-xl font-semibold rounded-xl">
                            No Image Available
                        </div>
                    )}
                </div>

                {/* Navigation Arrows */}
                {item.images && item.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            aria-label="Previous Image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-l from-blue-500 to-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-900 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            aria-label="Next Image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

            </div>

            {/* Item Description */}
            <p className="text-lg text-gray-700 mb-6">{item.description}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-6">${item.price}</p>

            {/* Quantity Selector */}
            <div className="mb-8 flex items-center space-x-6">
                <label htmlFor="quantity" className="text-lg font-semibold text-gray-800">
                    Quantity:
                </label>
                <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border border-gray-300 rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                >
                    {[...Array(10).keys()].map((n) => (
                        <option key={n} value={n + 1}>
                            {n + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Buy Now Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleBuyNow}
                    className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ItemDetail;
