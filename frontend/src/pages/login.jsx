import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) return alert('Please fill in all fields.');
    // Mock login: set user and navigate to dashboard
    setUser({ email });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-8 text-green-400">Login</h2>

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
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-400 py-2 rounded font-bold transition duration-300"
        >
          Login
        </button>
      </div>

      <p className="mt-6 text-gray-300">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-green-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
