"use client";

// import Image from "next/image";
// import { Separator } from "@/components/ui/separator";
// import { SidebarNav } from "./sidebar-nav";
// import { ReactNode } from "react";
// // import { signOut, useSession } from "next-auth/react";

// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

// const sidebarNavItems = [
//   {
//     title: "People with Disabilities",
//     href: "/admin/pwd",
//   },
//   {
//     title: "Barangays",
//     href: "/examples/forms/account",
//   },
//   {
//     title: "Announcements",
//     href: "/examples/forms/appearance",
//   },
//   {
//     title: "Disabilities",
//     href: "/examples/forms/notifications",
//   },
//   {
//     title: "Disability Causes",
//     href: "/examples/forms/display",
//   },
// ];

// export default function Admin() {
//   // signOut();

//   const session = useSession();
//   console.log(session);
//   console.log(session.data?.user.role);

//   // const query = useQuery({
//   //   queryKey: ["session"],
//   //   queryFn: () => useSession(),
//   // });

//   // if (query.data?.status == "authenticated") {
//   //   console.log(query.data?.data?.user.role);
//   // }
//   // const router = useRouter();

//   // if (session.status == "unauthenticated") {
//   //   router.push("/api/auth/signin");
//   // }
//   return (
//     <>
//       {/* <div className="md:hidden">
//          <Image
//           src="/examples/forms-light.png"
//           width={1280}
//           height={791}
//           alt="Forms"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/forms-dark.png"
//           width={1280}
//           height={791}
//           alt="Forms"
//           className="hidden dark:block"
//         />
//       </div> */}
//       <div className="hidden space-y-6 p-10 pb-16 md:block">
//         <div className="space-y-0.5">
//           <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
//           <p className="text-muted-foreground">Manage</p>
//         </div>
//         <Separator className="my-6" />
//         <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
//           <aside className="-mx-4 lg:w-1/5">
//             <SidebarNav items={sidebarNavItems} />
//           </aside>
//           {/* <div className="flex-1 lg:max-w-2xl">{children}</div> */}
//         </div>

//       </div>
//     </>
//   );
// }

// import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar-nav";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const sidebarNavItems = [
  {
    title: "PWD",
    href: "/admin",
  },
  {
    title: "Barangays",
    href: "/admin/barangay",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Annoucements",
    href: "/admin/announcements",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(status)

  if (status === "loading") {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    // return (
    //   <>
    //     <div className="flex w-screen h-screen justify-center items-center">
    //       <div className="flex flex-col items-center">
    //         <p>Access Denied</p>
    //         <Link href="/api/auth/signin" className="text-primary">
    //           Sign In
    //         </Link>
    //       </div>
    //     </div>
    //   </>
    // );
  }

  const logos = (
    <div className="flex gap-3">
      <Image
        className="w-auto h-auto"
        src={"/img/ph_flag.png"}
        width={80}
        height={80}
        alt="ph"
      />
      <Image
        className="w-auto h-auto rounded-full"
        src={"/img/disability.png"}
        width={60}
        height={60}
        alt="ph"
      />
      <Image
        className="w-auto h-auto"
        src={"/img/tinambac-seal.png"}
        width={60}
        height={60}
        alt="ph"
      />
    </div>
  );

  return (
    <>
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
            <p className="text-muted-foreground">
              Manage persons with disability and other data.
            </p>
          </div>
          {logos}
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
