import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import styled from 'styled-components';
import { BuilderProvider, useBuilder } from './contexts/BuilderContext';
import Canvas from './components/Builder/Canvas';
import Sidebar from './components/Builder/Sidebar';
import ElementEditor from './components/ElementEditors';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <BuilderProvider>
      <GlobalStyles />
      <BuilderInterface />
    </BuilderProvider>
  );
};

const BuilderInterface = () => {
  const [activeId, setActiveId] = useState(null);
  const { state, addElement } = useBuilder();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.id === 'canvas') {
      const type = active.data.current?.type;
      if (type) {
        addElement({
          id: `${type}-${Date.now()}`,
          type,
          content: `New ${type}`,
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Canvas />
        </MainContent>
        {state.selectedElement && (
          <EditorPanel>
            <ElementEditor element={state.selectedElement} />
          </EditorPanel>
        )}
      </AppContainer>
    </DndContext>
  );
};

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  padding: 20px;
`;

const EditorPanel = styled.div`
  width: 300px;
  background: white;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #e0e0e0;
  }
`;

export default App;