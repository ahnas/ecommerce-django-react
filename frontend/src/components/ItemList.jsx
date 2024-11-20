import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imgDelete, setImgDelete] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [itemImages, setItemImages] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await axios.get('http://localhost:8000/api/items/');
        setItems(res.data);
    };

    const fileInputRef = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        if (image) {
            formData.append('images', image); // Use 'images' to match the backend
        }

        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/api/items/${editingId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage('Item updated successfully!');
            } else {
                await axios.post('http://localhost:8000/api/items/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage('Item added successfully!');
            }

            // Reset form fields
            setName('');
            setPrice(0);
            setDescription('');
            setImage(null);
            setEditingId(null);
            setSelectedImageIndex(null); // Reset selected image index
            fileInputRef.current.value = '';

            fetchItems(); // Refresh items list
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            let errorMessage = 'An error occurred: ';
            const errorData = error?.response?.data;
            if (errorData) {
                const messages = [];
                if (errorData.name) {
                    messages.push(`Name: ${errorData.name.join(', ')}`);
                }
                if (errorData.price) {
                    messages.push(`Price: ${errorData.price.join(', ')}`);
                }
                if (errorData.description) {
                    messages.push(`Description: ${errorData.description.join(', ')}`);
                }
                if (messages.length > 0) {
                    errorMessage += messages.join('. ') + '.';
                } else {
                    errorMessage += 'Unknown error occurred.';
                }
            } else {
                errorMessage += 'Please try again later.';
            }

            setErrorMessage(errorMessage.trim());
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/items/${id}/`);
        setErrorMessage('Item Deleted Successfully');
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
        fetchItems();
    };

    const handleEdit = (item) => {
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
        setItemImages(item.images); 
        setImage(null);
        setEditingId(item.id);
        setImgDelete(true); 
        setSelectedImageIndex(null); 
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImage(files[0]);
    };

    const handleImageDelete = async (imageId) => {
        const updatedImages = itemImages.filter((img) => img.id !== imageId);
        setItemImages(updatedImages);
        try {
            await axios.delete(`http://localhost:8000/api/images/${imageId}/`);
            setErrorMessage('Image deleted successfully');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000)
        } catch (error) {
            console.error('Error deleting image:', error);
            setItemImages(itemImages);
        }
    };

    return (
        <div className="container mx-auto p-6">

            {/* Success/Error Message */}
            {successMessage && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                    {errorMessage}
                </div>
            )}
            {/* Add or Edit Item Form */}
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                        ref={fileInputRef}
                    />
                    {image && <p>Image selected: {image.name}</p>}

                    {editingId && itemImages.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-semibold">Current Images:</h3>
                            <div className="flex flex-wrap">
                                {itemImages.map((img, index) => (
                                    <div key={index} className="relative mx-2 mr-6">
                                        <img
                                            style={{ width: '50px', height: '80px' }}
                                            src={img.image}
                                            className="mx-auto"
                                            alt={`image-${index}`}
                                        />
                                        <div
                                            onClick={() => handleImageDelete(img.id)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                                            aria-label="Close image"
                                        >
                                            &times;
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        {editingId ? 'Update Item' : 'Add Item'}
                    </button>
                </form>
            </div>
            {/* Table View */}
            <h1 className="text-3xl font-bold mb-6 text-center">Item List</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold">Name</th>
                            <th className="py-3 px-6 text-left font-semibold">Price</th>
                            <th className="py-3 px-6 text-left font-semibold">Description</th>
                            <th className="py-3 px-6 text-center font-semibold">Image</th>
                            <th className="py-3 px-6 text-center font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="py-4 px-6">{item.name}</td>
                                <td className="py-4 px-6">{item.price}</td>
                                <td className="py-4 px-6 text-gray-600">{item.description}</td>
                                <td className="py-4 px-6 display flex justify-evenly">
                                    {item?.images?.length > 0 ? (
                                        item.images.map((image, index) => (
                                            <div key={index} className="relative mx-2">
                                                <img
                                                    style={{ width: '50px', height: '80px' }}
                                                    src={image?.image}
                                                    className="mx-auto"
                                                    alt={`image-${index}`}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <span>No images available</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="ml-3 text-blue-500 hover:text-blue-700 font-semibold"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;
