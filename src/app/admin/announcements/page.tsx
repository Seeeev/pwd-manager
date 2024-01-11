import { Separator } from "@/components/ui/separator";
import AddAnnoucementDialog from "./components/add-announcement-dialog";
import ViewAnnouncements from "./components/view-announcements";

export default function Announcements() {

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
      <AddAnnoucementDialog />
      <ViewAnnouncements/>
    </div>
  );
}
