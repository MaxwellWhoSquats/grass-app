import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import NavBar from "../NavBar";

const MessagingPage = async () => {
  // Check if user is loggin in, if not, redirect to login page
  const authenticated = await getServerSession(authOptions);
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <section id="heading" className="mx-5">
        <h1>Messages</h1>
      </section>
    </>
  );
};

export default MessagingPage;
