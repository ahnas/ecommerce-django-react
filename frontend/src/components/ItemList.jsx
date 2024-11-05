import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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
        await axios.post('http://localhost:8000/api/items/', newItem);
        setName('');
        setDescription('');
        fetchItems();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/items/${id}/`);
        fetchItems();
    };

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default ItemList;
