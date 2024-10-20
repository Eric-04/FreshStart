import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstTimeUser from './pages/FirstTimeUser';
import Welcome from './pages/Welcome';
import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* Ensure this div applies the App styles */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/first-time" element={<FirstTimeUser />} />
          <Route path="/map-display" element={<MapPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
