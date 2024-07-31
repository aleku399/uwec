"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { registerUser } from "@/api"; 
import { UserData } from "@/types"; 

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData: UserData = { firstName, lastName, email, password };
      const res = await registerUser(userData);

      const {status, payload: { employee, token}} = res;

      if (status) {
        Cookies.set("token", token, { expires: 7 }); 

        localStorage.setItem("token", token);
        localStorage.setItem("user", employee);
      }

      setSuccess("Signup successful. Redirecting to login page...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="flex flex-col space-y-4 max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

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

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded"
        >
          Sign Up
        </button>

        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
