import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '../../contexts/BuilderContext';

const ImageEditor = ({ element }) => {
  const { updateElement } = useBuilder();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateElement(element.id, { src: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <EditorContainer>
      <h3>Image Editor</h3>
      <FormGroup>
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </FormGroup>
      <FormGroup>
        <label>Alt Text</label>
        <input
          type="text"
          value={element.alt || ''}
          onChange={(e) => updateElement(element.id, { alt: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label>Width (%)</label>
        <input
          type="number"
          min="10"
          max="100"
          value={element.width || 100}
          onChange={(e) => updateElement(element.id, { width: Number(e.target.value) })}
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

export default ImageEditor; 