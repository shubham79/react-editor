import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ControlButtonsInline from './ControlButtonsInline';
import ControlButtonsBlock from './ControlButtonsBlock';

export default function RichTextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function toggleInlineStyle(inlineStyle) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  function toggleBlockType(blockType) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  return (
    <div>
      <div className='RichEditor-controls'>
        <ControlButtonsInline
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <ControlButtonsBlock
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>

      <div className='RichEditor-root'>
        <div className='RichEditor-editor'>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder='Editor'
            spellCheck={true}
          />
          ;
        </div>
      </div>
    </div>
  );
}
