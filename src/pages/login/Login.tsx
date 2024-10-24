import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/Auth';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth(); // Access the login function
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      
      navigate("/");
    } catch (error) {
      alert('Login failed: Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-4">
          {/* Logo or Image */}
          <img
            src="https://cdn.vectorstock.com/i/500p/43/98/student-education-logo-vector-14724398.jpg"
            alt="logo"
            className="w-24 h-24"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Please login to your account</p>

        <input
          className="w-full px-4 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 mb-6 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 text-white font-bold rounded-lg ${
            loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          } transition duration-300`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Optional forgot password or additional options */}
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
