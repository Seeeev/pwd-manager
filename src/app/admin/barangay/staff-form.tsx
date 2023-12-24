"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  barangayId: z.number(),
});

export default function StaffForm() {
  const query = useQuery({
    queryKey: ["barangay"],
    queryFn: () =>
      fetch("/api/barangay", {
        method: "GET",
      }).then(val=> val.json()),
  });   

  useEffect(() => {
    if (query.data) {
      console.log(query.data);
    }
  }, [query.data]);
  return <></>;
}
