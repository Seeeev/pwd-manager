"use client";

import { Separator } from "@/components/ui/separator";
import PwdTable from "./components/pwd-table";
import AddPwdDialog from "./components/add-pwd-dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PwdCount from "./components/pwd-count";
export default function SettingsProfilePage() {
  const session = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">PWD</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <AddPwdDialog />
          {session.status == "authenticated" &&
            session.data.user.role == "barangay" && (
              <Button>
                <Link href={"admin/record"}>PWD Record</Link>
              </Button>
            )}
        </div>
        <PwdCount />
      </div>

      {/* <ProfileForm /> */}

      <PwdTable />
    </div>
  );
}
