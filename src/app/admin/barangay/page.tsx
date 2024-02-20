"use client";

import { Separator } from "@/components/ui/separator";
import StaffForm from "./staff-form";
import BarangayTable from "./components/brangay-table";
import AddBarangayDialog from "./components/add-barangay-dialog";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import PwdCounter from "./components/pwd-counter";

// import { ProfileForm } from "@/app/examples/forms/profile-form";

export default function SettingsProfilePage() {
  const session = useSession();

  if (session.status == "authenticated" && session.data.user.role == "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Barangay</h3>
          <p className="text-sm text-muted-foreground">
            List of barangays is listed here.
          </p>
        </div>
        <Separator />
        {/* <ProfileForm /> */}
        {/* <StaffForm /> */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <AddBarangayDialog />
            <Button>
              <Link href={"barangay/record"}>PWD Record</Link>
            </Button>
          </div>
          <PwdCounter />
        </div>

        <BarangayTable />
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">
            This page is intended for the minicipal staff only
          </h3>
          {/* <p className="text-sm text-muted-foreground">
            List of barangays is listed here.
          </p> */}
        </div>
        <Separator />
        {/* <ProfileForm /> */}
        {/* <StaffForm /> */}
        {/* <AddBarangayDialog />
        <BarangayTable /> */}
      </div>
    );
  }
}
