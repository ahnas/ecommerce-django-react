import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragAndDrop = () => {
  const [droppedItems, setDroppedItems] = useState(() => JSON.parse(localStorage.getItem('droppedItems')) || []);

  useEffect(() => {
    localStorage.setItem('droppedItems', JSON.stringify(droppedItems));
  }, [droppedItems]);

  
  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index, 1);
    setDroppedItems(updatedItems);
  };

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
        <p className="text-center text-gray-700">Drop here</p>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center">
        <div className="border border-gray-300 p-8 rounded-lg shadow-lg bg-white w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-6">Drag and Drop Example</h1>
          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <h2 className="text-lg font-semibold mb-2">Drag Items</h2>
              {['Item 1', 'Item 2', 'Item 3'].map((name) => (
                <DragItem key={name} name={name} />
              ))}
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-lg font-semibold mb-2">Drop Zone</h2>
              <DropZone onDrop={handleDrop} />
              {droppedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center border border-gray-300 p-4 rounded-lg mt-2 bg-blue-100">
                  <p className="text-gray-700">{item.name}</p>
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
