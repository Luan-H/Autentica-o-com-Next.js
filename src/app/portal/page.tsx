import UserList from "@/modules/users/components/UserList";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PortalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Pagina do portal</h1>
      <UserList />

      <Link className={buttonVariants({ variant: 'link' })} href='/api/logout'>Logout</Link>
    </main>
  );
}