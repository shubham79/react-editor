import './App.css';
import RichTextEditor from './components/RichTextEditor';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Text Editor</h1>
      </header>
      <div className='text-editor'>
        <RichTextEditor />
      </div>
    </div>
  );
}

export default App;
