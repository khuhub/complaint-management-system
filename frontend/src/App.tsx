import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Submit from './pages/Submit';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/submit" element={<Submit />} />
        <Route path="/" element={<Navigate to="/submit" replace />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}