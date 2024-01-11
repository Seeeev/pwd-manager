"use client";

import { Announcement } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import AnnoucementCard from "./annoucement-card";

export default function ViewAnnoucements() {
  const query = useQuery({
    queryKey: ["annoucement"],
    queryFn: () =>
      fetch("/api/announcement", {
        method: "GET",
      }).then((val) => val.json()),
  });
  if (query.data) {
    console.log(query.data.success);
  }
  return (
    <ScrollArea>
      {query.data && query.data.success.length > 0 ? (
        <AnnoucementCard
          title={query.data.success.title}
          body={query.data.success.body}
          date={query.data.success.date}
        />
      ) : (
        "No announcments"
      )}
    </ScrollArea>
  );
}
