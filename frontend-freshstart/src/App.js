import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstTimeUser from './pages/FirstTimeUser';
import Welcome from './pages/Welcome';
<<<<<<< Updated upstream
import Navbar from './Navbar'; // Import the Navbar component
import Restaurants from './pages/Restaurants';
=======
>>>>>>> Stashed changes
import Volunteer from './pages/Volunteer';

function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* Ensure this div applies the App styles */}
        <Navbar /> {/* Include the Navbar component here */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/first-time" element={<FirstTimeUser />} />
<<<<<<< Updated upstream
          <Route path= "/volunteer" element={<Volunteer/>}/>
          <Route path="/restaurants" element={<Restaurants />} />
=======
          <Route path="/volunteer" element={<Volunteer/>}/>
>>>>>>> Stashed changes
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
