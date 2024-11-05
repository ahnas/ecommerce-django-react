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
            formData.append('image', image);
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

            setName('');
            setPrice('');
            setDescription('');
            setImage(null);  // Clear the image after submitting
            setEditingId(null);

            fileInputRef.current.value = '';

            fetchItems();
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error("There was an error submitting the form", error.response.data.name[0]);
            setErrorMessage(error.response.data.name[0]);
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
        setImage(null);
        setEditingId(item.id);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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
                                <td className="py-4 px-6 text-center">
                                    {item.image && <img src={item.image} alt={item.name} width={50} className="mx-auto" />}
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
