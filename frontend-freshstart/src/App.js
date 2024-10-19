import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstTimeUser from './pages/FirstTimeUser';

// Home component definition
function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* Ensure this div applies the App styles */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/first-time" element={<FirstTimeUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
