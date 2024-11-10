import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
    const [tudos, setTudos] = useState(() => JSON.parse(localStorage.getItem('tudos') || '[]'));
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [idCounter, setIdCounter] = useState(() => JSON.parse(localStorage.getItem('idCounter')) || 0);
    const [editId, setEditId] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [message, setMessage] = useState('')
    const [bgColor, setBgColor] = useState('')
    const [image, setImage] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('tudos', JSON.stringify(tudos));
        localStorage.setItem('idCounter', JSON.stringify(idCounter));
    }, [tudos, idCounter]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // This is the Base64 string of the image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (title.trim() && body.trim()) {
            if (editId === null) {
                const newTodo = { id: idCounter + 1, title: title.trim(), body: body.trim(), image: image };
                setTudos([...tudos, newTodo]);
                setIdCounter(idCounter + 1);
                setBgColor('green');
                setMessage('Item added successfully!')
            } else {
                const updatedTudos = tudos.map((item) =>
                    item.id === editId ? { ...item, title: title.trim(), body: body.trim(), image: image } : item
                );
                setTudos(updatedTudos);
                setEditId(null);
                setBgColor('green');
                setMessage('Item Updated successfully!')
            }
            setTitle('');
            setBody('');
            setImage(null);
            fileInputRef.current.value = '';
        }
        setTimeout(() => {
            setMessage('')
        }, 3000)
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setTitle(item.title);
        setBody(item.body);
        setImage(item.image);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        setTudos(tudos.filter(t => t.id !== deleteId));
        setShowDeleteConfirmation(false);
        setDeleteId(null);
        setBgColor('red');
        setMessage('Item Deleted successfully');
        setTimeout(() => {
            setMessage('')
        }, 3000)
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeleteId(null);
    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-center text-indigo-600 mb-8">Todo App with Local Storage</h3>

            {message && <div className={`bg-${bgColor}-100 text-${bgColor}-700 p-4 rounded-lg mb-4`}>
                {message}
            </div>}

            {/* Input Section */}
            <div className="space-y-6 mb-8">
                <input
                    type="text"
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter todo description"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <input
                    type="file"
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />


                <button
                    className="w-full py-3 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                    onClick={handleSubmit}
                >
                    {editId === null ? 'Add Todo' : 'Update Todo'}
                </button>
            </div>

            {/* Todo List Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Todos</h2>
            <table className="min-w-full table-auto text-sm text-gray-700 border-collapse">
                <thead>
                    <tr className="text-left text-gray-500">
                        <th className="px-6 py-3 font-medium">ID</th>
                        <th className="px-6 py-3 font-medium">Title</th>
                        <th className="px-6 py-3 font-medium">Body</th>
                        <th className="px-6 py-3 font-medium">Image</th>
                        <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tudos.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{item.id}</td>
                            <td className="px-6 py-4">{item.title}</td>
                            <td className="px-6 py-4">{item.body}</td>
                            <td className="px-6 py-4">
                                {item.image && <img src={item.image} alt="Todo Image" className="w-16 h-16 object-cover rounded" />}
                            </td>
                            <td className="px-6 py-4 space-x-4">
                                <button
                                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                                    onClick={() => handleDeleteClick(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this todo?</h3>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
