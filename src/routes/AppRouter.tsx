// src/routes/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from '../pages/home/Home';
import Teachers from '../pages/teachers/Teachers';
import Students from '../pages/students/Students';
import LoginPage from '../pages/login/Login';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    
    {/* Protected Routes */}
    <Route
      path="/teachers"
      element={
        <PrivateRoute requiredRole='ADMIN'>
          <Teachers />
        </PrivateRoute>
      }
    />
    <Route
      path="/students"
      element={
        <PrivateRoute requiredRole='ADMIN'>
          <Students />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRouter;
