"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser } from "@/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const { token } = await loginUser(credentials);

      Cookies.set("token", token, { expires: 7 }); 

      localStorage.setItem("token", token);

      router.push("/");
    } catch (error) {
      setError("Failed to login. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login to the Park App</h1>
        
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded">
          Login
        </button>

        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm">
            Don&rsquo;t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
          <p className="text-sm">
            Forgot your password?{" "}
            <a href="/reset-password" className="text-blue-500 hover:underline">
              Reset it
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
