"use client";
import { useSession } from "next-auth/react";
import UsersTable from "./components/UsersTable";
import AddUserDialog from "./components/add-user-dialog";
import { Separator } from "@/components/ui/separator";

export default function Users() {
  const session = useSession();

  if (session.status == "authenticated" && session.data.user.role == "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm text-muted-foreground">Manage users</p>
        </div>
        <AddUserDialog />
        <UsersTable />
      </div>
    );
  }
  else{
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">
            This page is intended for the minicipal staff only
          </h3>
        </div>
        <Separator />
      </div>
    );
  }
}
