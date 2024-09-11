import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  // Check if user is loggin in, if not, redirect to login page
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Orders Management</h1>
    </div>
  );
};

export default OrdersPage;
