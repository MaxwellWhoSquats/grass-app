"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await response.json();
    if (response.ok) {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      router.push("/login");
    } else {
      setError(data.error);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-error fixed bottom-4 left-4 z-50 inline-block max-w-xs">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 space-y-4 p-8 rounded-xl mx-auto glass shadow-xl"
      >
        <h1 className="text-2xl font-extrabold text-center">Register</h1>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div id="nameInputs" className="flex gap-2">
          <label className="input input-bordered flex items-center grow min-w-0">
            <input
              className="grow"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center grow min-w-0">
            <input
              className="grow"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-1/2">
            Register
          </button>
        </div>
        <div>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-secondary font-bold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
