import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Submit from './pages/Submit';
import Admin from './pages/Admin';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/submit" element={<Submit />} />
        <Route path="/" element={<Navigate to="/submit" replace />} />
        <Route path="/login" element={<Login />} />
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