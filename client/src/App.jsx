import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ElectionDetails from './pages/ElectionDetails';

const App = () => (
  <Router>
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Default to login */}
        <Route path='/' element={<Navigate to='/login' replace />} />

        {/* Public */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/election/:id' element={
          <ProtectedRoute>
            <ElectionDetails />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;