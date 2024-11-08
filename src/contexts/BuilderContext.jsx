import React, { createContext, useContext, useReducer } from 'react';

const BuilderContext = createContext();

const initialState = {
  elements: [],
  selectedElement: null,
  isDragging: false
};

function builderReducer(state, action) {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.payload]
      };
    
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(elem => 
          elem.id === action.payload.id ? { ...elem, ...action.payload.updates } : elem
        )
      };
    
    case 'DELETE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter(elem => elem.id !== action.payload),
        selectedElement: state.selectedElement?.id === action.payload ? null : state.selectedElement
      };
    
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload
      };
    
    case 'REORDER_ELEMENTS':
      const { oldIndex, newIndex } = action.payload;
      const elements = Array.from(state.elements);
      const [removed] = elements.splice(oldIndex, 1);
      elements.splice(newIndex, 0, removed);
      return {
        ...state,
        elements
      };
    
    default:
      return state;
  }
}

export function BuilderProvider({ children }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const value = {
    state,
    addElement: (element) => dispatch({ type: 'ADD_ELEMENT', payload: element }),
    updateElement: (id, updates) => dispatch({ type: 'UPDATE_ELEMENT', payload: { id, updates } }),
    deleteElement: (id) => dispatch({ type: 'DELETE_ELEMENT', payload: id }),
    selectElement: (element) => dispatch({ type: 'SELECT_ELEMENT', payload: element }),
    reorderElements: (oldIndex, newIndex) => 
      dispatch({ type: 'REORDER_ELEMENTS', payload: { oldIndex, newIndex } })
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
}; 