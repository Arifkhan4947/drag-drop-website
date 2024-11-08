import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';

const ButtonEditor = ({ element }) => {
  const { updateElement } = useBuilder();

  return (
    <EditorContainer>
      <h3>Button Editor</h3>
      <FormGroup>
        <label>Text</label>
        <input
          type="text"
          value={element.content}
          onChange={(e) => updateElement(element.id, { content: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label>Link</label>
        <input
          type="url"
          value={element.link || ''}
          onChange={(e) => updateElement(element.id, { link: e.target.value })}
          placeholder="https://"
        />
      </FormGroup>
      <FormGroup>
        <label>Background Color</label>
        <input
          type="color"
          value={element.backgroundColor || '#007bff'}
          onChange={(e) => updateElement(element.id, { backgroundColor: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label>Text Color</label>
        <input
          type="color"
          value={element.textColor || '#ffffff'}
          onChange={(e) => updateElement(element.id, { textColor: e.target.value })}
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
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

export default ButtonEditor; 