import UsersList from "@/components/users-list";
import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      profile_picture: true,
      password: true,
    },
  });

  return (
    <div className="...">
      <UsersList users={users} />
    </div>
  );
}
