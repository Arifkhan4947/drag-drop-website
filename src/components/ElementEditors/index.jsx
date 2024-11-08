import React from 'react';
import TextEditor from './TextEditor';
import ImageEditor from './ImageEditor';
import ButtonEditor from './ButtonEditor';

const ElementEditor = ({ element }) => {
  switch (element.type) {
    case 'text':
      return <TextEditor element={element} />;
    case 'image':
      return <ImageEditor element={element} />;
    case 'button':
      return <ButtonEditor element={element} />;
    default:
      return <div>No editor available for this element type</div>;
  }
};

export default ElementEditor; 