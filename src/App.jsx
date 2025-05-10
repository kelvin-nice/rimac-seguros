import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './ui/pages/HomePage';
import LoginPage from './ui/pages/LoginPage';
import ResumePage from './ui/pages/ResumePage';
import Header from './ui/components/Header';
import './ui/styles/main.scss';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/plans" element={<ResumePage />} />
      </Routes>
    </Router>
  );
}

export default App;
