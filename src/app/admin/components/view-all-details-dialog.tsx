"use client";
import { bloodTypes } from "@/app/constants/bloodTypes";
import { Button } from "@/components/ui/button";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
type PWD = Prisma.PwdGetPayload<{
  include: {
    disability: true;
    barangay: true;
  };
}>;
interface ViewAllDetailsProps {
  pwdNumber: String;
}

function formatDate(date: Date): string {
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  // Add the appropriate suffix to the day
  const dayWithSuffix: string = addOrdinalSuffix(day);

  // Concatenate the formatted date with the day suffix
  const finalFormattedDate: string = `${dayWithSuffix} ${month} ${year}`;

  return finalFormattedDate;
}

function addOrdinalSuffix(num: number): string {
  if (num >= 11 && num <= 13) {
    return `${num}th`;
  }
  const lastDigit: number = num % 10;
  switch (lastDigit) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
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
  let birthDate = "";

  const gender = (query.data && query.data.gender) || "";
  const bloodType = (query.data && query.data?.bloodType) || "";
  const mobileNumber = (query.data && query.data?.mobileNumber) || "";

  if (query.data) {
    name = `${query.data?.lastName || ""}, ${query.data?.firstName || ""} ${
      query.data?.middleName || ""
    } ${query.data?.suffix || ""}`;

    birthDate = formatDate(new Date(query.data.birthDate));

    disability = `${query.data?.disability
      .map((item) => item.name)
      .join(", ")}`;
    address = `${query.data.streetName || ""} ${
      query.data.barangay?.name || ""
    }, Tinambac, Camarines Sur`;
  }

  const handleClick = (
    pwdNumber: String,
    fullName: string,
    birthDate: string,
    gender: string,
    disability: string,
    bloodType: string,
    contactNumber: string
  ) => {
    if (query.data) {
      const doc = new jsPDF({
        unit: "in",
        format: [11, 8.5],
        orientation: "p",
        filters: [],
      });

      doc.text(`PWD: Number: ${pwdNumber}`, 1, 1);
      doc.text(`Full Name: ${fullName}`, 1, 1.3);
      doc.text(`Birth Date: ${birthDate}`, 1, 1.6);
      doc.text(`Gender: ${gender}`, 1, 1.9);
      doc.text(`Disability: ${disability}`, 1, 2.2);
      doc.text(`Blood Type: ${bloodType}`, 1, 2.5);
      doc.text(`Address: ${address}`, 1, 2.8);
      doc.text(`Contact Number: ${contactNumber}`, 1, 3.1);
      doc.save("details.pdf");
    }
  };
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
        <div className="">
          <p>PWD Number: {pwdNumber}</p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>Name: {name}</li>
              <li>Birthdate: {birthDate}</li>
              <li>Gender: {gender}</li>
              <li>Disability: {disability}</li>
              <li>Blood Type: {bloodType}</li>
              <li>Address: {address}</li>
              <li>Mobile Number: {mobileNumber}</li>
            </ul>
          </blockquote>
        </div>
        <Button
          onClick={() =>
            handleClick(
              pwdNumber,
              name,
              birthDate,
              gender,
              disability,
              bloodType,
              mobileNumber
            )
          }
        >
          Print
        </Button>

        {/* <Table>
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
        </Table> */}
      </DialogContent>
    </Dialog>
  );
}
