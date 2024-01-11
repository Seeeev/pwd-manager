"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { title } from "process";
import { Trash2 } from "lucide-react";
import DeleteAnnouncementDialog from "./delete-announcement-dialog";
import { useSession } from "next-auth/react";
interface AnnoucementCardProps {
  title: string;
  body: string;
  date: Date;
  mutation: any;
  id: number;
}
export default function AnnoucementCard({
  id,
  title,
  body,
  date,
  mutation,
}: AnnoucementCardProps) {
  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate.replace(/\//g, "-");
  }
  const session = useSession();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-primary">{title}</CardTitle>
          {session.data?.user.role == "admin" && (
            <DeleteAnnouncementDialog id={id} mutation={mutation} />
          )}
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <p>{formatDate(date)}</p>
      </CardFooter>
    </Card>
  );
}
