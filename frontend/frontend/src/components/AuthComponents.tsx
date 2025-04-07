import React, { ReactNode } from 'react';

interface AuthFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      {children}
    </form>
  );
};

interface AuthHeaderProps {
  title: string;
  subtitle: ReactNode;
  icon: ReactNode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
};

interface AuthInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required = true,
  className = "bg-white"
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg ${className} border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500`}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  type = "submit",
  className = "",
  onClick,
  children
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export const LoginIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M14 9l6 6-6 6" />
    <path d="M4 4v7a4 4 0 0 0 4 4h11" />
  </svg>
);

export const SignupIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
    <path d="M16 8h1" />
  </svg>
);
