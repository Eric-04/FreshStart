import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstTimeUser from './pages/FirstTimeUser';

// Home component definition
function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

function App() {
  return (
    <BrowserRouter> {/* Wrap Routes with BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first-time" element={<FirstTimeUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
