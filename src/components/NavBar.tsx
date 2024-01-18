import Link from "next/link";
import { ReactNode } from "react";

export default function NavBar() {
  return (
    <div className="w-screen h-10 bg-primary flex justify-end items-center px-14">
      <Link href={"/admin"} className="text-white">
        Admin Page
      </Link>
    </div>
  );
}
