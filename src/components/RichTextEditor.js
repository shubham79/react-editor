import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ControlButtons from './ControlButtons';

export default function RichTextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function toggleInlineStyle(inlineStyle) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }
  return (
    <div>
      <ControlButtons editorState={editorState} onToggle={toggleInlineStyle} />
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
