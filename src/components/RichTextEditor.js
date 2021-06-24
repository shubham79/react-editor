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
    setCustomStyleMap({
      FONT_SIZE: {
        fontSize: `${fontSize}px`,
      },
    });
    const newState = RichUtils.toggleInlineStyle(editorState, `${fontSize}px`);
    setEditorState(newState);
    focusEditor();
  }

  useEffect(() => {
    const newState = RichUtils.toggleInlineStyle(editorState, 'FONT_SIZE');
    setEditorState(newState);
    focusEditor();
  }, [customStyleMap]);

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
