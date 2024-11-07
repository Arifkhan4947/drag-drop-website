import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styled from 'styled-components';

const ELEMENT_TYPES = [
  { id: 'text', type: 'text', label: 'Text Block' },
  { id: 'image', type: 'image', label: 'Image' },
  { id: 'button', type: 'button', label: 'Button' }
];

const DraggableElement = ({ element }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: element.type
    }
  });

  return (
    <ElementItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      $isDragging={isDragging}
    >
      {element.label}
    </ElementItem>
  );
};

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>Elements</h2>
      <ElementList>
        {ELEMENT_TYPES.map((element) => (
          <DraggableElement key={element.id} element={element} />
        ))}
      </ElementList>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  background: #f8f9fa;
  padding: 20px;
  border-right: 1px solid #dee2e6;
  height: 100vh;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
  }
`;

const ElementList = styled.div`
  margin-top: 20px;
`;

const ElementItem = styled.div`
  padding: 12px;
  margin: 8px 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: grab;
  opacity: ${props => props.$isDragging ? 0.5 : 1};
  
  &:hover {
    background: #f1f3f5;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
`;

export default Sidebar; 