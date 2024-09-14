import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import NavBar from "../NavBar";
import ConversationWrapper from "./components/ConversationWrapper";
import prisma from "@/prisma/db";

const MessagingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const currentUserId = Number(session.user.id);

  // Fetch the current user's details
  const currentUser = await prisma.user.findUnique({
    where: { id: currentUserId },
  });

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex flex-col flex-1 overflow-hidden">
        <section className="px-5 mt-6">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
        </section>
        <div className="flex flex-1 overflow-hidden px-5 mt-4 mb-6">
          <ConversationWrapper currentUser={currentUser} />
        </div>
      </main>
    </div>
  );
};

export default MessagingPage;
