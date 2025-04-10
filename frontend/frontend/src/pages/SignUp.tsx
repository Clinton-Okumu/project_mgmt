import React, { useState } from "react";
import {
  AuthForm,
  AuthHeader,
  AuthInput,
  AuthButton,
  SignupIcon,
} from "../components/Auth/AuthComponents.tsx";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.ts";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser({
        name,
        email,
        password,
      });
      console.log("Registration successful:", response.message);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup failed:", error.message);
        setError(error.message);
      } else {
        setError("An unknown error occurred during signup.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6">
        <AuthHeader
          title="Create your account"
          subtitle={
            <>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-500 hover:text-purple-400"
              >
                Sign in
              </a>
            </>
          }
          icon={<SignupIcon />}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AuthForm onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            By clicking below to create an account, you agree to the{" "}
            <a href="/terms" className="text-purple-500 hover:text-purple-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-purple-500 hover:text-purple-400"
            >
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
