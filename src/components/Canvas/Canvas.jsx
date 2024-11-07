import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';
import CanvasElement from './CanvasElement';

const Canvas = () => {
  const { elements } = useBuilder();
  const { setNodeRef } = useDroppable({
    id: 'canvas'
  });

  return (
    <CanvasContainer>
      <DropZone ref={setNodeRef}>
        {elements.map((element, index) => (
          <CanvasElement
            key={element.id}
            element={element}
            index={index}
          />
        ))}
      </DropZone>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

const DropZone = styled.div`
  min-height: 100%;
  padding: 20px;
  background: white;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
`;

export default Canvas; 