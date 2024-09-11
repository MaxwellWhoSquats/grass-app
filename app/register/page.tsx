import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); // Redirect to home page if signed in
  }

  return (
    <section className="flex justify-center items-center h-screen bg-green-200">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
