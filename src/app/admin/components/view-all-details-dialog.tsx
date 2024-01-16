"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
interface ViewAllDetailsProps {
  pwdNumber: String;
}

export default function ViewAllDetails({ pwdNumber }: ViewAllDetailsProps) {
  const query = useQuery({
    queryKey: ["pwd"],
    queryFn: () =>
      fetch(`api/pwd/specific-pwd?id=${pwdNumber}`, { method: "GET" }).then((val) => val.json()),
  });
  return (
    <Dialog>
      <DialogTrigger className="text-sm">View All Details</DialogTrigger>

      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <pre className="mt-2 rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(query.data, null, 2)}
            </code>
          </pre>
      </DialogContent>
    </Dialog>
  );
}
