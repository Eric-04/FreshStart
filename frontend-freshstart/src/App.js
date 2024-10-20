import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstTimeUser from './pages/FirstTimeUser';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* Ensure this div applies the App styles */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/first-time" element={<FirstTimeUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
