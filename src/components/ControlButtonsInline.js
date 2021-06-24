import React from 'react';
import StyleButton from './StyleButton';

const BUTTON_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

export default function ControlButtonsInline(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <>
      {BUTTON_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </>
  );
}
