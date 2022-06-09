import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/Home'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="iNotebook" />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/about' exact element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;