import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './lib/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FitnessTracker from './pages/FitnessTracker';
import TrainingGuidance from './pages/TrainingGuidance';
import Opportunities from './pages/Opportunities';
import AthleteProfile from './pages/AthleteProfile';
import About from './pages/About';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tracker" element={<FitnessTracker />} />
            <Route path="training" element={<TrainingGuidance />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="profile" element={<AthleteProfile />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
