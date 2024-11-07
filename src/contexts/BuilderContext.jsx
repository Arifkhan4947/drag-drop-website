import React, { createContext, useContext, useState } from 'react';

const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (newElement) => {
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = (id, updates) => {
    setElements(prev => 
      prev.map(elem => 
        elem.id === id ? { ...elem, ...updates } : elem
      )
    );
  };

  const deleteElement = (id) => {
    setElements(prev => prev.filter(elem => elem.id !== id));
  };

  const reorderElements = (startIndex, endIndex) => {
    setElements(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const value = {
    elements,
    selectedElement,
    setSelectedElement,
    addElement,
    updateElement,
    deleteElement,
    reorderElements
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}; 