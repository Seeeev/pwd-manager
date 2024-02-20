"use client";

import { useQuery } from "@tanstack/react-query";
import { Accessibility } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PwdCount() {
  const session = useSession();
  const query = useQuery<number>({
    queryKey: ["count"],
    queryFn: () => {
      if (
        session.status == "authenticated" &&
        session.data.user.role == "barangay"
      ) {
        return fetch(
          `/api/pwd/specific-barangay-count?barangayId=${session.data.user.barangayId}`,
          {
            method: "GET",
          }
        ).then((val) => val.json());
      } else {
        throw new Error("Error fetchin data");
      }
    },
  });
  let count = 0;
  count = (query.data && query.data) || 0;
  return (
    <div className="flex flex-col border rounded-lg p-2">
      <div className="flex">
        {query.isFetched && <p className="self-end">{count}</p>}
        <Accessibility className="text-primary w-10 h-10" />
      </div>
      <p className="text-xs text-muted-foreground">Total PWD</p>
    </div>
  );
}
