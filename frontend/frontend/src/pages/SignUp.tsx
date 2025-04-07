import React, { useState } from 'react';
import {
  AuthForm,
  AuthHeader,
  AuthInput,
  AuthButton,
  SignupIcon
} from '../components/AuthComponents.tsx';

const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your sign up logic here
    console.log('Creating account with:', fullName, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6">
        <AuthHeader
          title="Create your account"
          subtitle={
            <>
              Already have an account?{' '}
              <a href="/login" className="text-purple-500 hover:text-purple-400">
                Sign in
              </a>
            </>
          }
          icon={<SignupIcon />}
        />

        <AuthForm onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <AuthInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-sm text-gray-400 mb-6">
            By clicking below to create an account, you agree to the{' '}
            <a href="/terms" className="text-purple-500 hover:text-purple-400">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-purple-500 hover:text-purple-400">
              Privacy Policy
            </a>
          </div>

          <AuthButton>Create account</AuthButton>
        </AuthForm>
      </div>
    </div>
  );
};

export default SignupPage;
