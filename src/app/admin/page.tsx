import { Separator } from "@/components/ui/separator";
// import ProfileForm from "./components/profile-form";
import PwdTable from "./components/pwd-table";

// import { ProfileForm } from "@/app/examples/forms/profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">PWD</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      {/* <ProfileForm /> */}
      <PwdTable />
    </div>
  );
}
