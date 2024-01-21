"use client";
import { bloodTypes } from "@/app/constants/bloodTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
type PWD = Prisma.PwdGetPayload<{
  include: {
    disability: true;
    barangay: true;
  };
}>;
interface ViewAllDetailsProps {
  pwdNumber: String;
}

export default function ViewAllDetails({ pwdNumber }: ViewAllDetailsProps) {
  const query = useQuery<PWD>({
    queryKey: ["pwd"],
    queryFn: () =>
      fetch(`api/pwd/specific-pwd?id=${pwdNumber}`, { method: "GET" }).then(
        (val) => val.json()
      ),
  });

  let name = "";
  let disability = "";
  let address = "";

  if (query.data) {
    name = `${query.data?.lastName || ""}, ${query.data?.firstName || ""} ${
      query.data?.middleName || ""
    } ${query.data?.suffix || ""}`;

    disability = `${query.data?.disability
      .map((item) => item.name)
      .join(", ")}`;
    address = `${query.data.streetName || ""} ${
      query.data.barangay?.name || ""
    }, Tinambac, Camarines Sur`;
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm">View All Details</DialogTrigger>

      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogDescription>View Details</DialogDescription>
        </DialogHeader>
        {/* <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(query.data, null, 2)}
          </code>
        </pre> */}
        {/* <div className="">
          <p>PWD Number: 12-121-1211-111111</p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>Name: {name}</li>
              <li>Disability: {disability}</li>
              <li>Blood Type: {(query.data && query.data?.bloodType) || ""}</li>
              <li>Address: {address}</li>
              <li>
                Mobile Number: {(query.data && query.data?.mobileNumber) || ""}
              </li>
            </ul>
          </blockquote>
        </div> */}

        <Table>
          <TableCaption>Details of this PWD</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">PWD NUmber</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Disability</TableHead>
              <TableHead className="text-right">Blood Type</TableHead>
              <TableHead className="text-right">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {query.data && query.data.pwdNumber}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{disability}</TableCell>
              <TableCell className="text-center">
                {(query.data && query.data?.bloodType) || ""}
              </TableCell>
              <TableCell>{address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
