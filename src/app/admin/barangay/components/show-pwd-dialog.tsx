import { Pwd } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataTablePagination from "../../components/table-pagination";

interface ShowPwdDialogProps {
  data: Pwd[];
}
export default function ShowPwdDialog({ data }: ShowPwdDialogProps) {
  console.log(data);
  return (
    <Dialog>
      <DialogTrigger className="text-sm">Show PWD</DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          {/* <DialogTitle>List of PWD in this barangay</DialogTitle> */}
          <DialogDescription>
            Here is the list of PWDs in this barangay.
          </DialogDescription>
          {/* <ScrollArea className="h-[400px]">
            {data.length != 0 ? (
              data.map((pwd, index) => (
                <p key={pwd.pwdNumber}>
                  {`${index + 1}. ${pwd.lastName || ""}, ${
                    pwd.firstName || ""
                  } ${pwd.middleName || ""} ${pwd.suffix || ""}`}
                </p>
              ))
            ) : (
              <p>No PWD found.</p>
            )}
          </ScrollArea> */}
          <PwdTable columns={columns} data={data} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const columns: ColumnDef<Pwd>[] = [
  {
    accessorKey: "pwdNumber",
    header: "PWD Number",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div>
        {`${row.original.firstName || ""}, ${row.original.middleName || ""}, ${
          row.original.lastName || ""
        }, ${row.original.suffix || ""}`}
      </div>
    ),
  },
];

interface PwdTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function PwdTable<TData, TValue>({
  columns,
  data,
}: PwdTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
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
