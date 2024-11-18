
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';

const DragAndDrop = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index, 1);
    setDroppedItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">Drag and Drop Example</h1>
          <div className="flex justify-around">
            <div className="w-1/3">
              <h2 className="text-lg font-semibold mb-2">Drag Items</h2>
              <DragItem name="Item 1" />
              <DragItem name="Item 2" />
              <DragItem name="Item 3" />
            </div>
            <div className="w-1/3">
              <h2 className="text-lg font-semibold mb-2">Drop Zone</h2>
              <DropZone onDrop={handleDrop} />
              {droppedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center border border-gray-300 p-4 rounded-lg mt-2 bg-blue-100">
                  <p>{item.name}</p>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
