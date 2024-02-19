import { useQuery } from "@tanstack/react-query";
import { Accessibility } from "lucide-react";

export default function PwdCounter() {
  const query = useQuery<number>({
    queryKey: ["count"],
    queryFn: () =>
      fetch("/api/pwd/count", {
        method: "GET",
      }).then((val) => val.json()),
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
