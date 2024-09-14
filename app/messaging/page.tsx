import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import NavBar from "../NavBar";
import getUsers from "../actions/getUsers";
import ConversationWrapper from "./components/ConversationWrapper";

const MessagingPage = async () => {
  const authenticated = await getServerSession(authOptions);
  if (!authenticated) {
    redirect("/login");
  }

  const users = await getUsers();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex flex-col flex-1 overflow-hidden">
        <section className="px-5 mt-6">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
        </section>
        <div className="flex flex-1 overflow-hidden px-5 mt-4 mb-6">
          <ConversationWrapper users={users} />
        </div>
      </main>
    </div>
  );
};

export default MessagingPage;
