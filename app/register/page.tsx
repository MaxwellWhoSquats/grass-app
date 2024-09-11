import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); // Redirect to home page if signed in
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
