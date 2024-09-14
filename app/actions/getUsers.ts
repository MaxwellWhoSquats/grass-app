import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

const getUsers = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                firstName: "asc",
            },
            where: {
                AND: [
                    { email: { not: session.user.email } },
                    { firstName: { not: 'Admin' } },
                ]
            },
        });

        return users;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export default getUsers;