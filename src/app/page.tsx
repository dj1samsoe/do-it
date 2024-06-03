import Home from "@/modules/Home";
import Sidebar from "@/modules/Sidebar";
import { User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="h-full w-full flex flex-row p-2">
      <Sidebar user={session?.user as User} />
      <Home />
    </section>
  );
}
