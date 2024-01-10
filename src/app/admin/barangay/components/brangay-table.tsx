"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { sessionType } from "../../../../../types/session-type";
import { Barangay } from "@prisma/client";
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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "../../components/table-pagination";
import DeleteBarangayDialog from "./delete-barangay-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function BarangayTable() {
  const rowActions: ColumnDef<Barangay> = {
    id: "actions",
    cell: ({ row }) => {
      const barangay = row.original;
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
            <DeleteBarangayDialog mutation={mutation} barangay={barangay} />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const columns: ColumnDef<Barangay>[] = [
    rowActions,
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (data: Barangay) =>
      fetch("/api/barangay", {
        method: "DELETE",
        body: JSON.stringify(data),
      }).then((val) => val.json()),
    onSuccess: (data) => {
      query.refetch();
      if (data.success) {
        toast({
          title : "Success",
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
      toast({
        title: "Error",
        description: "An error occured.",
      });
    },
  });

  const query = useQuery<Barangay[]>({
    queryKey: ["barangay"],
    queryFn: () =>
      fetch("/api/barangay", { method: "GET" }).then((val) => val.json()),
  });

  let data: Barangay[] = [];

  if (query.data) {
    data = query.data;
  }

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
            ) : query.isFetching ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Fetching barangays...
                </TableCell>
              </TableRow>
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
      <div>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
