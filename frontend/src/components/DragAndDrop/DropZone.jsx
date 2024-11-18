// DropZone.js

import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border-dashed border-2 p-4 rounded-lg ${isOver ? 'border-green-500' : 'border-gray-400'}`}
        >
            <p className="text-center">Drop here</p>
        </div>
    );
};

export default DropZone;
