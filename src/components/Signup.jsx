import React, { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Dummy signup logic
    setError('');
    alert('Account created! (Demo only)');
    // Redirect or set auth state here
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="auth-error">{error}</div>}
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" />
        <button type="submit" className="auth-btn">Sign Up</button>
        <div className="auth-link">
          Already have an account?{' '}
          <span className="link" onClick={() => navigate('/login')}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Signup; 