import './App.css';
import Popup from './Popup/popup';
import { useState } from 'react';
import Segment from './Popup/segment';

function App() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="App">
      <button onClick={togglePopup} className='button'>
        Save Segment
      </button>
      {isOpen && <Popup
      content={<>
        <Segment />
      </>}
      handleClose={togglePopup}
    />}
    </div>
  );
}

export default App;
