import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
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

  const query = useQuery({
    queryKey: ["requirements"],
    queryFn: () =>
      fetch(`api/requirements?id=${pwdNumber}`, { method: "GET" }).then((val) =>
        val.json()
      ),
  });

  return (
    <Dialog>
      <DialogTrigger className="text-sm">View sent requirements</DialogTrigger>
      {query.isFetching && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading..</DialogTitle>
            {/* <DialogDescription>
              <Skeleton className="w-[400px] h-[400px] rounded-sm" />
            </DialogDescription> */}
          </DialogHeader>
        </DialogContent>
      )}

      {query.error && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>An error occured</DialogTitle>
          </DialogHeader>
        </DialogContent>
      )}
      {query.isSuccess && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PWD Requirements</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {query.data.imageUrls && query.data.imageUrls.length === 0
              ? "No requirements have been sent"
              : null}
          </DialogDescription>
          <ScrollArea className="max-h-[400px]">
            <div className="flex flex-col gap-3">
              {query.data.imageUrls &&
                (query.data.imageUrls as ImageUrls[]).map((val) => (
                  <Image
                    key={val.url}
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
