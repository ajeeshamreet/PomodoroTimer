import React from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Timer />
        <Tasks />
      </main>
    </div>
  );
}

export default App;