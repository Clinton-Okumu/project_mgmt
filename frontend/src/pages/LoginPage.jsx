import React, { useState } from "react";
import {
  AuthForm,
  AuthHeader,
  AuthInput,
  AuthButton,
  LoginIcon,
} from "../components/auth/AuthComponents.jsx";
import { loginUser } from "../services/AuthService.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser({ email, password });
      console.log("Login successful:", response.token);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        setError(error.message);
      } else {
        setError("An unknown error occurred during login.");
      }
    }

    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6">
        <AuthHeader
          title="Welcome back"
          subtitle={
            <>
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-purple-500 hover:text-purple-400"
              >
                Sign up
              </a>
            </>
          }
          icon={<LoginIcon />}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <AuthForm onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            placeholder="Email Address"
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
            <a
              href="/forgot-password"
              className="text-sm text-purple-500 hover:text-purple-400"
            >
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
