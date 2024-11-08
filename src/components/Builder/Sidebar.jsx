import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styled from 'styled-components';
import { CSS } from '@dnd-kit/utilities';

const ELEMENT_TYPES = [
  { id: 'text', type: 'text', label: 'Text Block', icon: '📝' },
  { id: 'image', type: 'image', label: 'Image', icon: '🖼️' },
  { id: 'button', type: 'button', label: 'Button', icon: '🔘' }
];

const DraggableElement = ({ element }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: element.type
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <ElementItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="icon">{element.icon}</span>
      <span className="label">{element.label}</span>
    </ElementItem>
  );
};

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <h2>Elements</h2>
        <p>Drag elements to the canvas</p>
      </SidebarHeader>
      <ElementList>
        {ELEMENT_TYPES.map((element) => (
          <DraggableElement key={element.id} element={element} />
        ))}
      </ElementList>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 280px;
  background: white;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  
  h2 {
    margin: 0;
    color: #333;
    font-size: 1.2em;
  }
  
  p {
    margin: 5px 0 0;
    color: #666;
    font-size: 0.9em;
  }
`;

const ElementList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ElementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: grab;
  user-select: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f3f5;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .icon {
    font-size: 1.2em;
  }
  
  .label {
    font-size: 0.9em;
    color: #333;
  }
`;

export default Sidebar; 