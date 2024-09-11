import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LoginForm from "./form";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); // Redirect to home page if signed in
  }

  return (
    <section className="flex justify-center items-center h-screen bg-green-200">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
