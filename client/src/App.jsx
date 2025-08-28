import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ExecutiveCommittee from './components/ExecutiveCommittee';
import Activities from './pages/Activities.jsx';
import Info from './pages/Info.jsx';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Constitution from './components/Constitution';
import Elections2022 from './components/Elections2022';
import MinutesFirstExec from './components/MinutesFirstExec';
import YearReview1819 from './components/YearReview1819';
import YearReview1920 from './components/YearReview1920';
import HistoryUGCC from './components/HistoryUGCC';
import OASDebate from './components/OASDebate';
import CareerDay2025 from './components/CareerDay2025';
import RegisterInterest from './components/RegisterInterest';
import Login from './components/Login';
import Register from './components/Register';
import Pictures from './components/Pictures';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 1000, margin: '0 auto', padding: '1rem' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/activities" element={<Activities />} />
        <Route path="/info" element={<Info />} />
        <Route path="/register-interest" element={<RegisterInterest />} />
        <Route path="/constitution" element={<Constitution />} />
        <Route path="/elections-2022-2023" element={<Elections2022 />} />
        <Route path="/first-executive-minutes" element={<MinutesFirstExec />} />
        <Route path="/executive-committee" element={<ExecutiveCommittee />} />
        <Route path="/year-in-review-2018-2019" element={<YearReview1819 />} />
        <Route path="/year-in-review-2019-2020" element={<YearReview1920 />} />
        <Route path="/history-ugcc" element={<HistoryUGCC />} />
        <Route path="/oas-debate" element={<OASDebate />} />
        <Route path="/career-day-2025" element={<CareerDay2025 />} />
        <Route path="/docs/pictures" element={<Pictures />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
