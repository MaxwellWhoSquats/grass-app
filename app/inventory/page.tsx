import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import NavBar from "../NavBar";
import InventoryWrapper from "./components/InventoryWrapper";

const InventoryPage = async () => {
  // Check if user is loggin in, if not, redirect to login page
  const authenticated = await getServerSession(authOptions);
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex flex-1 overflow-hidden px-5">
        <InventoryWrapper />
      </main>
    </div>
  );
};

export default InventoryPage;
