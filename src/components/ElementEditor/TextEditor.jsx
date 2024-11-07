import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';

const TextEditor = ({ element }) => {
  const { updateElement } = useBuilder();

  return (
    <EditorContainer>
      <h3>Text Editor</h3>
      <FormGroup>
        <label>Content</label>
        <textarea
          value={element.content}
          onChange={(e) => updateElement(element.id, { content: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label>Font Size</label>
        <input
          type="number"
          value={element.fontSize || 16}
          onChange={(e) => updateElement(element.id, { fontSize: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label>Color</label>
        <input
          type="color"
          value={element.color || '#000000'}
          onChange={(e) => updateElement(element.id, { color: e.target.value })}
        />
      </FormGroup>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export default TextEditor; 