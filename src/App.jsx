import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import VerifyEmail from './components/Pages/VerifyEmail';
import ProtectedRoute from '../App/ProtectedRoute';
import Dashboard from './components/Pages/Dashboard';
import Exams from './components/Pages/Exams';
import Sections from './components/Pages/Sections';
import AdminExaminees from './components/Faculty/Examinees/Examinees';
import AttemptExam from './components/Students/AttemptExam';
import AttempQuestions from './components/Students/AttemptQuestions';
import SubmitSection from './components/Students/SubmitSection';
import Result from './components/Students/Result';
import Report from './components/Students/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/exams/:examId/sections" element={<Sections />} />
          <Route
            path="/exams/:examId/sections/examinees"
            element={<AdminExaminees />}
          />
          <Route path="/attempt-exam" element={<AttemptExam />} />
          <Route
            path="/attempt-exam/attempt-question"
            element={<AttempQuestions />}
          />
          <Route
            path="/attempt-exam/submit-section"
            element={<SubmitSection />}
          />
          <Route path="/results" element={<Result />} />
          <Route path="/report" element={<Report />} />
        </Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
