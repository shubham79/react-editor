import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ControlButtonsInline from './ControlButtonsInline';
import ControlButtonsBlock from './ControlButtonsBlock';

export default function RichTextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  const [customStyleMap, setCustomStyleMap] = useState({
    FONT_SIZE: {
      fontSize: '30px',
    },
    FONT_COLOR: {
      color: '#000000',
    },
  });

  /**
   * @description Function to set Inline Type style
   * @param {string} inlineStyle
   */
  function toggleInlineStyle(inlineStyle) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    focusEditor();
  }

  /**
   * @description Function to set Block Type layput
   * @param {string} blockType
   */
  function toggleBlockType(blockType) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleFontSize(fontSize) {
    const isNotNumber = isNaN(fontSize);
    if (isNotNumber) {
      alert('Please enter digits only');
      return;
    }
    setCustomStyleMap({
      FONT_SIZE: {
        fontSize: `${fontSize}px`,
      },
      FONT_COLOR: {
        color: customStyleMap.FONT_COLOR.color,
      },
    });
    const newState = RichUtils.toggleInlineStyle(editorState, `${fontSize}px`);
    // setEditorState(newState);
    focusEditor();
  }

  useEffect(() => {
    const newState = RichUtils.toggleInlineStyle(editorState, 'FONT_SIZE');
    const newState2 = RichUtils.toggleInlineStyle(newState, 'FONT_COLOR');
    setEditorState(newState2);
    focusEditor();
  }, [customStyleMap]);

  function toggleFontColor(hexCode) {
    setCustomStyleMap({
      FONT_SIZE: { fontSize: customStyleMap.FONT_SIZE.fontSize },
      FONT_COLOR: {
        color: `#${hexCode}`,
      },
    });
    const newState = RichUtils.toggleInlineStyle(editorState, `#${hexCode}`);
    setEditorState(newState);
    focusEditor();
  }

  return (
    <div>
      <div className='RichEditor-controls'>
        <ControlButtonsInline
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <input
          className='RichEditor-styleButton'
          type='text'
          placeholder='Font size (px)'
          id='fontSetter'
          onBlur={(e) => toggleFontSize(e.target.value)}
        />

        <input
          className='RichEditor-styleButton'
          type='text'
          placeholder='Color Hex Code'
          id='fontColor'
          onBlur={(e) => toggleFontColor(e.target.value)}
        />

        <ControlButtonsBlock
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>

      <div className='RichEditor-root'>
        <div className='RichEditor-editor' id='editor'>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder='Editor'
            spellCheck={true}
            ref={editor}
            customStyleMap={customStyleMap}
          />
          ;
        </div>
      </div>
    </div>
  );
}
