import React from 'react';

export default function StyleButton(props) {
  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  return (
    <button className={className} onMouseDown={(e) => onToggle(e)}>
      {props.label}
    </button>
  );
}
