import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUrls } from "@prisma/client";

interface ViewRequirementsProps {
  pwdNumber: String;
}

export default function ViewRequirements({ pwdNumber }: ViewRequirementsProps) {
  const mutation = useMutation({
    mutationFn: (pwdNumber: String) =>
      fetch("api/requirements", {
        method: "POST",
        body: JSON.stringify(pwdNumber),
      }).then((val) => val.json()),
  });

  if (mutation.isSuccess) {
    console.log(mutation.data.imageUrls);
  }

  useEffect(() => {
    mutation.mutate(pwdNumber);
  }, []);

  return (
    <Dialog>
      <DialogTrigger>View sent requirements</DialogTrigger>
      {mutation.isPending && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading..</DialogTitle>
            {/* <DialogDescription>
              <Skeleton className="w-[400px] h-[400px] rounded-sm" />
            </DialogDescription> */}
          </DialogHeader>
        </DialogContent>
      )}

      {mutation.error && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>An error occured</DialogTitle>
          </DialogHeader>
        </DialogContent>
      )}
      {mutation.isSuccess && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PWd Requirements</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {(mutation.data.imageUrls as ImageUrls[]).length == 0
              ? "No requirements has been sent"
              : null}
          </DialogDescription>
          <ScrollArea className="max-h-[400px]">
            <div className="flex flex-col gap-3">
              {(mutation.data.imageUrls as ImageUrls[]).map((val) => (
                <Image
                  src={val.url}
                  className="w-auto h-auto"
                  width={700}
                  height={400}
                  alt={val.url}
                />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
