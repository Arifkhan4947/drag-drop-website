import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';

const TextEditor = ({ element }) => {
  const { updateElement } = useBuilder();

  const handleContentChange = (e) => {
    e.preventDefault(); // Prevent any default behavior
    updateElement(element.id, { content: e.target.value });
  };

  return (
    <EditorContainer>
      <h3>Text Editor</h3>
      <FormGroup>
        <label htmlFor="content">Content</label>
        <StyledTextarea
          id="content"
          value={element.content || ''}
          onChange={handleContentChange}
          placeholder="Enter your text here..."
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="fontSize">Font Size (px)</label>
        <StyledInput
          id="fontSize"
          type="number"
          value={element.fontSize || 16}
          onChange={(e) => updateElement(element.id, { fontSize: Number(e.target.value) })}
          min="8"
          max="72"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="color">Color</label>
        <StyledInput
          id="color"
          type="color"
          value={element.color || '#000000'}
          onChange={(e) => updateElement(element.id, { color: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="fontWeight">Font Weight</label>
        <StyledSelect
          id="fontWeight"
          value={element.fontWeight || 'normal'}
          onChange={(e) => updateElement(element.id, { fontWeight: e.target.value })}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </StyledSelect>
      </FormGroup>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  padding: 20px;
  
  h3 {
    margin-bottom: 20px;
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
  }
  
  &[type="color"] {
    height: 40px;
    padding: 4px;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
  }
`;

export default TextEditor; 