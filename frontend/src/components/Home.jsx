import React, { useEffect, useState } from 'react';

const Home = () => {
    const [tudos, setTudos] = useState(() => JSON.parse(localStorage.getItem('tudos') || '[]'));
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const savedTudos = JSON.parse(localStorage.getItem('tudos') || '[]');
        setTudos(savedTudos);
    }, []);

    useEffect(() => {
        localStorage.setItem('tudos', JSON.stringify(tudos));
    }, [tudos]);

    const handleSubmit = () => {
        if (title.trim() && body.trim()) {
            setTudos([...tudos, { id: Date.now(), title: title.trim(), body: body.trim() }]);
            setTitle('');
            setBody('');
        }
    };

    const handleDelete = (id) => {
        setTudos(tudos.filter(t => t.id !== id));
    };

    const handleEdit = (item) => {
        setTitle(item.title);
        setBody(item.body);
        setTudos(tudos.filter(t => t.id !== item.id));
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h3 className="text-2xl font-semibold text-center mb-4">Todo App With Locale Storage</h3>
            <div className="space-y-4 mb-6">
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Add Todo
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-2">Todos List</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Body</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tudos.map(item => (
                        <tr key={item.id} className="border-b">
                            <td className="px-4 py-2">{item.title}</td>
                            <td className="px-4 py-2">{item.body}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
