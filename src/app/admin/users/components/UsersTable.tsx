"use client";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
// import { Barangay, User } from "@prisma/client";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import DataTablePagination from "../../components/table-pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Prisma, Role } from "@prisma/client";
import { useMemo } from "react";
import EdituserDialog from "./edit-user-dialog";
import { toast } from "@/components/ui/use-toast";

export default function UsersTable() {
  const User: Prisma.UserInclude = {
    barangay: true,
  };
  const rowActions: ColumnDef<typeof User> = {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
            <EdituserDialog mutation={mutation} user={user} />
 
            {/* <DropdownMenuItem onClick={() => console.log(users)}>
              Edit
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      role: Role;
      barangay: string;
    }) =>
      fetch("/api/users", {
        method: "PUT",
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
      toast({
        title: "Error",
        description: "An error occured.",
      });
    },
  });
  const query = useQuery<(typeof User)[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("/api/users", {
        method: "GET",
      }).then((val) => val.json()),
  });

  const columns: ColumnDef<typeof User>[] = [
    rowActions,
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "barangayId",
      header: "Barangay",
    },
  ];

  let data: (typeof User)[] = useMemo(() => {
    return query.data ? [...query.data] : [];
  }, [query.data]);

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
                  Fetching users...
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
