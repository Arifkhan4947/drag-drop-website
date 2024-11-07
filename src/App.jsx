import React from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import styled from 'styled-components';
import { BuilderProvider, useBuilder } from './contexts/BuilderContext';
import Canvas from './components/Canvas/Canvas';
import Sidebar from './components/Sidebar/Sidebar';
import GlobalStyles from './styles/GlobalStyles';

const DragDropContent = () => {
  const { addElement } = useBuilder();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.data.current?.type && over.id === 'canvas') {
      const newElement = {
        id: `${active.data.current.type}-${Date.now()}`,
        type: active.data.current.type,
        content: `New ${active.data.current.type}`,
      };
      addElement(newElement);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Canvas />
        </MainContent>
      </AppContainer>
    </DndContext>
  );
};

const App = () => {
  return (
    <BuilderProvider>
      <GlobalStyles />
      <DragDropContent />
    </BuilderProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  gap: 20px;
`;

const MainContent = styled.main`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: auto;
`;

export default App;