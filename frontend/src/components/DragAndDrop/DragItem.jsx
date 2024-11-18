import React from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`opacity-${isDragging ? '50' : '100'} cursor-move border border-gray-300 p-4 rounded-lg mb-2 bg-blue-200 transition duration-300`}
        >
            {name}
        </div>
    );
};

export default DragItem;
