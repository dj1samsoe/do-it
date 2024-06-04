import Header from "@/modules/Header";
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
    <div className="w-full min-h-screen flex flex-col">
      <div className="lg:hidden flex pt-2">
        <Header user={session?.user as User} />
      </div>
      <div className="h-full w-full flex flex-row lg:p-2 p-5">
        <header className="w-full max-w-[300px] hidden lg:flex">
          <Sidebar user={session?.user as User} />
        </header>
        <Home />
      </div>
    </div>
  );
}
