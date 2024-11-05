import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);  // To store the selected image
    const [editingId, setEditingId] = useState(null);

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
        formData.append('description', description);
        if (image) {
            formData.append('image', image);  // Append image if provided
        }

        try {
            if (editingId) {
                // If editing, send a PUT request
                await axios.put(`http://localhost:8000/api/items/${editingId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',  // Ensure the content type is multipart/form-data
                    },
                });
            } else {
                // If adding, send a POST request
                await axios.post('http://localhost:8000/api/items/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            setName('');
            setDescription('');
            setImage(null);  // Clear the image after submitting
            setEditingId(null);

            fileInputRef.current.value = '';

            fetchItems();
        } catch (error) {
            console.error("There was an error submitting the form", error);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/items/${id}/`);
        fetchItems();
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setImage(null);  // Reset the image when editing (not required, but can be useful)
        setEditingId(item.id);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Item List</h1>

            {/* Item List */}
            {/* Table structure */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold">Name</th>
                            <th className="py-3 px-6 text-left font-semibold">Description</th>
                            <th className="py-3 px-6 text-center font-semibold">Image</th>
                            <th className="py-3 px-6 text-center font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="py-4 px-6">{item.name}</td>
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
        </div>
    );
};

export default ItemList;
