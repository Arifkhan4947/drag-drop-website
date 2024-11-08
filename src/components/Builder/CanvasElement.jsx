import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';

const CanvasElement = ({ element, index }) => {
  const { selectElement, deleteElement } = useBuilder();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <TextElement style={{
            fontSize: `${element.fontSize || 16}px`,
            color: element.color || '#000000',
            fontWeight: element.fontWeight || 'normal'
          }}>
            {element.content}
          </TextElement>
        );

      case 'image':
        return (
          <ImageElement>
            {element.src ? (
              <img 
                src={element.src} 
                alt={element.alt || ''} 
                style={{ width: `${element.width || 100}%` }}
              />
            ) : (
              <ImagePlaceholder>
                Drop an image here
              </ImagePlaceholder>
            )}
          </ImageElement>
        );

      case 'button':
        return (
          <ButtonElement
            style={{
              backgroundColor: element.backgroundColor || '#007bff',
              color: element.textColor || '#ffffff'
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (element.link) window.open(element.link, '_blank');
            }}
          >
            {element.content || 'Click me'}
          </ButtonElement>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <ElementWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => selectElement(element)}
    >
      <ElementContent>
        {renderElement()}
      </ElementContent>
      <ElementControls>
        <ControlButton onClick={(e) => {
          e.stopPropagation();
          deleteElement(element.id);
        }}>
          🗑️
        </ControlButton>
        <DragHandle {...listeners}>
          ⋮⋮
        </DragHandle>
      </ElementControls>
    </ElementWrapper>
  );
};

const ElementWrapper = styled.div`
  position: relative;
  margin: 8px 0;
  padding: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    .element-controls {
      opacity: 1;
    }
  }
`;

const ElementContent = styled.div`
  width: 100%;
`;

const ElementControls = styled.div.attrs({ className: 'element-controls' })`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const ControlButton = styled.button`
  padding: 4px 8px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: #e9ecef;
  }
`;

const DragHandle = styled.div`
  padding: 4px 8px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
  
  &:hover {
    background: #e9ecef;
  }
`;

const TextElement = styled.div`
  width: 100%;
  word-break: break-word;
`;

const ImageElement = styled.div`
  width: 100%;
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: #f8f9fa;
  border: 2px dashed #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const ButtonElement = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

export default CanvasElement; 