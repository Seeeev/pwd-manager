"use client";
import { useEffect, useState } from "react";
import { $Enums, Pwd } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
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

import prisma from "@/prisma";
import EditPwd from "./edit-pwd-sheet";
import DataTablePagination from "./table-pagination";

type tableType = {
  pwdNumber: String;
  name: String;
  barangay: number | null;
  status: $Enums.Status;
};

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
            <EditPwd data={pwd.pwdNumber} />
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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

export default function PwdTable() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<tableType[]>([]);
  const query = useQuery({
    queryKey: ["pwd"],
    queryFn: () =>
      fetch("api/pwd", {
        method: "GET",
      }).then((val) => val.json()),
  });

  useEffect(() => {
    if (query.data) {
      if (query.data.error) {
        setOpen(true);
      } else {
        query.data.map((val: any) => console.log(val.status));
        const newData: tableType[] = query.data.map((val: any) => {
          const pwdNumber = val.pwdNumber;
          const name = `${val.lastName}, ${val.firstName} ${val.middleName} ${val.suffix}`;
          const barangay = val.barangay.name;
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
  }, [query.data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
