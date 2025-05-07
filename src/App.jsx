import React from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Timer />
      </main>
    </div>
  );
}

export default App;