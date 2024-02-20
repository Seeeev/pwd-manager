"use client";

import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import DataTablePagination from "../components/table-pagination";
import { useSession } from "next-auth/react";

export default function Record() {
  const session = useSession();

  type PWD = Prisma.PwdGetPayload<{
    include: {
      _count: true;
      barangay: true;
      disability: true;
    };
  }>;

  const columns: ColumnDef<PWD>[] = [
    {
      accessorKey: "pwdNumber",
      header: "Application Number",
    },
    {
      accessorKey: "name",
      header: "Name",

      cell: ({ row }) => {
        const pwd = row.original;

        const firstName =
          pwd.firstName.charAt(0).toUpperCase() + pwd.firstName.slice(1);
        const middleName =
          (pwd.middleName && pwd.middleName.charAt(0).toUpperCase() + ".") ||
          "";
        const lastName =
          (pwd.lastName &&
            pwd.lastName.charAt(0).toUpperCase() + pwd.lastName.slice(1)) ||
          "";
        return `${firstName} ${middleName} ${lastName}`;
      },
    },
    {
      accessorKey: "middleName",
      header: "Middle Name",
      cell: ({ row }) => {
        const pwd = row.original;
        return (
          (pwd.middleName &&
            pwd.middleName.charAt(0).toUpperCase() +
              pwd.firstName.slice(1)) || (
            <p className="text-destructive">none</p>
          )
        );
      },
    },
    {
      accessorKey: "birthDate",
      header: "Birth Date",
      cell: ({ row }) => {
        const pwd = row.original;

        const date = new Date(pwd.birthDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month since it's zero-based
        const day = date.getDate().toString().padStart(2, "0");
        return `${month}-${day}-${year}`;
      },
    },
    {
      accessorKey: "barangay",
      header: "Barangay",
      cell: ({ row }) =>
        (row.original.barangay && row.original.barangay.name) || "",
    },
    {
      accessorKey: "disability",
      header: "Type of Disability",
      cell: ({ row }) =>
        row.original.disability.map((obj) => obj.name).join(", "),
    },
  ];

  const query = useQuery<PWD[]>({
    queryKey: ["pwd"],
    queryFn: () => {
      if (session.status == "authenticated") {
        return fetch(`/api/pwd/specific-barangay?barangayId=${session.data.user.barangayId}`, {
          method: "GET",
        }).then((val) => val.json());
      } else {
        throw new Error("User not authenticated");
      }
    },
  });

  let data = query.data ? query.data : [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex w-full justify-end">
        <Link href="/admin" className="text-primary">
          Back
        </Link>
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
    </>
  );
}
