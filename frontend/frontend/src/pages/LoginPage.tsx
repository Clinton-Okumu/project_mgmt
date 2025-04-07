import React, { useState } from 'react';
import {
  AuthForm,
  AuthHeader,
  AuthInput,
  AuthButton,
  LoginIcon
} from '../components/AuthComponents.tsx';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6">
        <AuthHeader
          title="Welcome back"
          subtitle={
            <>
              Don't have an account?{' '}
              <a href="/signup" className="text-purple-500 hover:text-purple-400">
                Sign up
              </a>
            </>
          }
          icon={<LoginIcon />}
        />

        <AuthForm onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            placeholder="clint@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-yellow-50"
          />

          <AuthInput
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-yellow-50"
          />

          <div className="flex justify-end mb-6">
            <a href="/forgot-password" className="text-sm text-purple-500 hover:text-purple-400">
              Forgot your password?
            </a>
          </div>

          <AuthButton>Sign in</AuthButton>
        </AuthForm>
      </div>
    </div>
  );
};

export default LoginPage;
