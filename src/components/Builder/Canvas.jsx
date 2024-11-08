import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';
import CanvasElement from './CanvasElement';

const Canvas = () => {
  const { state } = useBuilder();
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas'
  });

  return (
    <CanvasContainer>
      <DropZone ref={setNodeRef} $isOver={isOver}>
        <SortableContext 
          items={state.elements.map(e => e.id)}
          strategy={verticalListSortingStrategy}
        >
          {state.elements.map((element, index) => (
            <CanvasElement
              key={element.id}
              element={element}
              index={index}
            />
          ))}
        </SortableContext>
        {state.elements.length === 0 && (
          <EmptyState>
            Drag elements here to start building
          </EmptyState>
        )}
      </DropZone>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow: auto;
`;

const DropZone = styled.div`
  min-height: 100%;
  padding: 20px;
  background: white;
  border: 2px dashed ${props => props.$isOver ? '#007bff' : '#e0e0e0'};
  border-radius: 8px;
  transition: border-color 0.2s ease;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-size: 1.1em;
`;

export default Canvas; 