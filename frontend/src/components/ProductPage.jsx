import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
    const [items, setItems] = useState([]);

    // Fetch products from the API
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

    return (
        <div className="container mx-auto p-4">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

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
                                    onClick={() => alert(`Added ${item.name} to cart`)} // Placeholder for add-to-cart functionality
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
