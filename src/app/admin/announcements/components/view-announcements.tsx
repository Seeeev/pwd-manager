"use client";

import { Announcement } from "@prisma/client";

import { useMutation, useQuery } from "@tanstack/react-query";
import AnnoucementCard from "./annoucement-card";
import { AnyARecord } from "dns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

export default function ViewAnnoucements() {
  const query = useQuery({
    queryKey: ["annoucement"],
    queryFn: () =>
      fetch("/api/announcement", {
        method: "GET",
      }).then((val) => val.json()),
  });
  if (query.data) {
    console.log(query.data);
  }
  const mutation = useMutation({
    mutationFn: (data: { id: number }) =>
      fetch("/api/announcement", {
        method: "DELETE",
        body: JSON.stringify(data),
      }).then((val) => val.json()),
    onSuccess: (data) => {
      if (data.success) {
        query.refetch();
        toast({
          title: "Success",
          description: data.success,
        });
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
        });
      }
    },
    onError: (data) => {
      console.log(data);
      toast({
        title: "Error",
        description: "An error occured.",
      });
    },
  });

  return (
    <ScrollArea className="h-[500px]">
      <div className="flex flex-col gap-3">
        {query.data && query.data.length > 0
          ? query.data.map((value: any) => (
              <AnnoucementCard
                id={value.id}
                title={value.title}
                body={value.body}
                date={value.createdAt}
                mutation={mutation}
                key={value.id}
              />
            ))
          : "Fetching announcements..."}
      </div>
    </ScrollArea>
  );
}
