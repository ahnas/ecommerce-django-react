import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await axios.get('http://localhost:8000/api/items/');
        setItems(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = { name, description };

        if (editingId) {
            await axios.put(`http://localhost:8000/api/items/${editingId}/`, newItem);
        } else {
            await axios.post('http://localhost:8000/api/items/', newItem);
        }

        setName('');
        setDescription('');
        setEditingId(null);
        fetchItems();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/items/${id}/`);
        fetchItems();
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setEditingId(item.id);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Item List</h1>

            {/* Item List */}
            <ul className="space-y-4">
                {items.map(item => (
                    <li
                        onClick={() => handleEdit(item)}
                        key={item.id}
                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item.id);
                            }}
                            className="text-red-500 hover:text-red-700 font-semibold"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

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
