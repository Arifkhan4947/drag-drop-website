import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';

const CanvasElement = ({ element }) => {
  const { setSelectedElement } = useBuilder();

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        return <p>{element.content}</p>;
      case 'image':
        return <div className="image-placeholder">{element.content}</div>;
      case 'button':
        return <button>{element.content}</button>;
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <ElementWrapper onClick={() => setSelectedElement(element)}>
      {renderContent()}
    </ElementWrapper>
  );
};

const ElementWrapper = styled.div`
  margin: 8px 0;
  padding: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .image-placeholder {
    height: 100px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #e0e0e0;
  }

  button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export default CanvasElement; 