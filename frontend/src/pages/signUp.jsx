import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword)
      return alert('Please fill in all fields.');
    if (password !== confirmPassword)
      return alert('Passwords do not match.');

    try {
      const res = await axios.post('http://localhost:8000/api/signup/', {
        username: email, 
        email,
        password,
      });

      if (res.status === 201) {
        alert('Signup successful! Please login.');
        navigate('/login'); 
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-8 text-green-400">Sign Up</h2>

      <div className="flex flex-col w-80 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSignup}
          className="bg-green-500 hover:bg-green-400 py-2 rounded font-bold transition duration-300"
        >
          Sign Up
        </button>
      </div>

      <p className="mt-6 text-gray-300">
        Already have an account?{' '}
        <Link to="/login" className="text-green-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
