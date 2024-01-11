"use client";
import { Separator } from "@/components/ui/separator";
import AddAnnoucementDialog from "./components/add-announcement-dialog";
import ViewAnnouncements from "./components/view-announcements";
import { useSession } from "next-auth/react";

export default function Announcements() {
  const session = useSession();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Announcements</h3>
        <p className="text-sm text-muted-foreground">
          Posted announcements will show up here.
        </p>
      </div>
      <Separator />
      {/* <ProfileForm /> */}
      {session.data?.user.role == "admin" && <AddAnnoucementDialog />}

      <ViewAnnouncements />
    </div>
  );
}
