import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import NavBar from "../NavBar";

const InventoryPage = async () => {
  // Check if user is loggin in, if not, redirect to login page
  const authenticated = await getServerSession(authOptions);
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex flex-col flex-1 overflow-hidden">
        <section className="px-5 mt-6">
          <h1 className="text-3xl font-bold text-gray-800 border border-red-600">
            Inventory
          </h1>
        </section>
        <section className="flex flex-1 overflow-hidden px-5 my-4 border border-blue-800">
          <InventoryTable />
        </section>
      </main>
    </div>
  );
};

export default InventoryPage;
