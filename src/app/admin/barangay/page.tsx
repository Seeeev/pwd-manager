"use client";

import { Separator } from "@/components/ui/separator";
import StaffForm from "./staff-form";
import BarangayTable from "./components/brangay-table";
import AddBarangayDialog from "./components/add-barangay-dialog";

// import { ProfileForm } from "@/app/examples/forms/profile-form";

export default function SettingsProfilePage() {

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
      <AddBarangayDialog/>
      <BarangayTable/>
    </div>
  );
}
