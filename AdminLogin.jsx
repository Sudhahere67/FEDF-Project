// src/components/AdminLogin.jsx
import React, { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin(true);
    } else {
      alert('Invalid Credentials!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-[#8c1515]">
        <h2 className="text-2xl font-serif font-bold text-[#8c1515] mb-6 text-center">KLH University Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8c1515]" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8c1515]" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-[#8c1515] hover:bg-[#721212] text-white py-2 rounded font-semibold transition">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}