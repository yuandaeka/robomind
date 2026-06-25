import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatbotPage from './pages/ChatbotPage';
import ScreeningPage from './pages/ScreeningPage';
import FeaturesPage from './pages/FeaturesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/screening" element={<ScreeningPage />} />
        <Route path="/games" element={<FeaturesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
