// src/components/Layout/Layout.tsx
import React from 'react';
import Navbar from '../../components/navbar/Navbar';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="App">
    <Navbar />
    <main className="container mx-auto mt-4 px-4">
      {children}
    </main>
  </div>
);

export default Layout;
