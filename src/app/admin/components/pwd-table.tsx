"use client";
import { useEffect, useState } from "react";
import { $Enums, Pwd, Status } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DataTablePagination from "./table-pagination";
import EditPwdDialog from "./edit-pwd-dialog";
import { useDialogStore } from "@/zustand-states/states";
import { useSession } from "next-auth/react";
import ViewRequirements from "./view-requirements";
import { handleGeneratePdf } from "../certificate/components/pdf-component";
import { sessionType } from "../../../../types/session-type";
import ViewAllDetails from "./view-all-details-dialog";

export default function PwdTable() {
  const session = useSession();

  const [open, setOpen] = useState(false);

  type tableType = {
    pwdNumber: String;
    name: String;
    barangay: number | null;
    status: $Enums.Status;
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const mutation = useMutation({
    mutationFn: (data: { pwdNumber: String; status: Status }) =>
      fetch("api/status", { method: "PUT", body: JSON.stringify(data) }).then(
        (val) => val.json()
      ),
    onMutate: () => setIsDisabled(true),
    onSuccess: (data) => {
      setIsDisabled(false);
      query.refetch();
    },
    onError: (data) => {
      setIsDisabled(false);
      console.log("error");
    },
  });

  const columns: ColumnDef<tableType>[] = [
    {
      id: "actions",
      cell: ({ row }) => {
        const pwd = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {session.status == "authenticated" &&
                session.data?.user.role == "admin" && (
                  <div className="pl-2">
                    <EditPwdDialog query={query} pwdNumber={pwd.pwdNumber} />
                  </div>
                )}
              <DropdownMenuItem
                disabled={isDisabled}
                onClick={() =>
                  mutation.mutate({
                    pwdNumber: pwd.pwdNumber,
                    status: "approved",
                  })
                }
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={pwd.status == "pending" || pwd.status == "rejected"}
                onClick={() =>
                  handleGeneratePdf(pwd.pwdNumber.valueOf(), pwd.name.valueOf())
                }
              >
                Generate Certificate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  mutation.mutate({
                    pwdNumber: pwd.pwdNumber,
                    status: "rejected",
                  })
                }
              >
                Reject
              </DropdownMenuItem>
              <div className="pl-2">
                <ViewRequirements pwdNumber={pwd.pwdNumber} />
              </div>
              <div className="pl-2">
                <ViewAllDetails pwdNumber={pwd.pwdNumber} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "pwdNumber",
      header: "PWD Number",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "barangay",
      header: "Barangay",
    },
  ];

  const [data, setData] = useState<tableType[]>([]);

  // const query = useQuery({
  //   queryKey: ["pwd"],
  //   queryFn: () =>
  //     fetch("api/pwd", {
  //       method: "GET",
  //     }).then((val) => val.json()),
  // });
  type ACTION = "approved" | "apparent" | "nonApparent" | "default";
  const [action, setAction] = useState<ACTION>("default");

  const query = useQuery({
    queryKey: ["approved"],
    refetchInterval: 500,
    queryFn: () => {
      if (session.status == "authenticated") {
        const role = session.data.user.role;
        const barangayId = session.data.user.barangayId;
        const params = new URLSearchParams();
        params.append("action", action);
        params.append("role", role!);
        params.append("barangayId", barangayId ? barangayId.toString() : "");
        params.toString();
        console.log(params.get("action"));
        return fetch(`api/pwd-filter?${params}`, {
          method: "GET",
        }).then((val) => val.json());
      }
    },
  });

  useEffect(() => {
    if (query.data) {
      if (query.data.error) {
        setOpen(true);
      } else {
        // .filter((val: any) => {
        //   if (
        //     (session.status === "authenticated" &&
        //       session.data.user.role === "barangay" &&
        //       session.data.user.barangayId &&
        //       session.data.user.barangayId.toString() ===
        //         val.barangay.id.toString()) ||
        //     (session.status === "authenticated" &&
        //       session.data.user.role === "admin")
        //   ) {
        //     return true;
        //   }
        //   return false;
        // })
        const newData: tableType[] = query.data.map((val: any) => {
          const pwdNumber = val.pwdNumber;
          const name = `${val.lastName}, ${val.firstName} ${
            val.middleName || ""
          } ${val.suffix || ""}`;
          const barangay = val.barangay ? val.barangay.name : "";
          const status = val.status;

          return {
            barangay: barangay,
            name: name,
            pwdNumber: pwdNumber,
            status: status!,
          };
        });
        setData(newData);
      }
    }
  }, [query.data, query.isFetched, action]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const [externalDialogOpen, setExternalDialogOpen] = useState(false);

  const handleExternalDialogOpenChange = (newOpenState: boolean) => {
    setExternalDialogOpen(newOpenState);
    // Additional logic if needed when the dialog state changes externally
  };

  const updateDialogState = useDialogStore((state) => state.update);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error fetching data</DialogTitle>
            <DialogDescription>
              Database might be offline or disable any vpn, contact the
              administrator to fix the issue.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div>
        {/* search by pwdNumber */}
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter PWD Number..."
            value={
              (table.getColumn("pwdNumber")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("pwdNumber")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-3 py-2">
          {session.status == "authenticated" &&
            session.data.user.role == "admin" && (
              <>
                <Button
                  className="text-xs rounded-full"
                  onClick={() => {
                    setAction("apparent");

                    query.refetch();
                  }}
                >
                  Show Apparent Only
                </Button>
                <Button
                  className="text-xs rounded-full"
                  onClick={() => {
                    setAction("nonApparent");
                    query.refetch();
                  }}
                >
                  Show Non-Apparent Only
                </Button>
              </>
            )}
          <Button
            className="text-xs rounded-full"
            onClick={() => {
              setAction("approved");
              query.refetch();
            }}
          >
            Show Approved Only
          </Button>
          <Button
            className="text-xs rounded-full"
            onClick={() => {
              setAction("default");
              query.refetch();
            }}
          >
            Show All
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
