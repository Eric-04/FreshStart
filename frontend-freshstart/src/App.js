import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstTimeUser from './pages/FirstTimeUser';
import Welcome from './pages/Welcome';
import Navbar from './Navbar'; // Import the Navbar component
import Restaurants from './pages/Restaurants';
import Volunteer from './pages/Volunteer';

import MapPage from './pages/MapPage';


function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* Ensure this div applies the App styles */}
        <Navbar /> {/* Include the Navbar component here */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/first-time" element={<FirstTimeUser />} />

          <Route path= "/volunteer" element={<Volunteer/>}/>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/map-display" element={<MapPage/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
