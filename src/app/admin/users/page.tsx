'use client';
import { useSession } from "next-auth/react";
import UsersTable from "./components/UsersTable";
import AddUserDialog from "./components/add-user-dialog";

export default function Users() {
  const session = useSession();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">Manage users</p>
      </div>
      {session.data?.user.role == "admin" ? (
        <>
          <AddUserDialog />
          <UsersTable />
        </>
      ) : (
        "This page is not intended for Barangay users"
      )}
    </div>
  );
}
