import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const CustomersPage = async () => {
  // Check if user is loggin in, if not, redirect to login page
  const authenticated = await getServerSession(authOptions);
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Customer Management</h1>
    </div>
  );
};

export default CustomersPage;
