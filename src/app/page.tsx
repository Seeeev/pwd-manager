import ApplicationForm from "@/components/ApplicationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import prisma from "@/prisma";

// await prisma.pwd.create({
//   data: {
//     pwdNumber: "12-1211-121-184991",
//     firstName: "asdasd",
//     lastName: "asdasd",
//     barangay: "asdasd",
//     municipality: "adsasd",
//     province: "sdada",
//     region: "ad",
//     mobileNumber: "09123233222",
//     birthDate: new Date("12-12-1211"),
//     gender: "female",
//     civilStatus: "separated",
//     bloodType: "ab+",
//     isPhilhealthMember: true,
//     isPhilhealthMemberDependent: false,
//     accomplishedBy: "091232322",
//     isApplicant: true,
//     isGuardian: false,
//     isRepresentative: false,
//     disability: {
//       connect: [{ id: 12 }, { id: 13 }],
//     },
//     disabilityCause: {
//       connect: [{ id: 27 }, { id: 26 }],
//     },
//   },
//   include: {
//     disability: true,
//     disabilityCause: true,
//     occupation: true,
//   },
// });

export default function Home() {
  return (
    <>
      <Card className="mx-1 my-3 sm:mx-10">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between">
            <div>
              <CardTitle className="text-primary">
                PWD Application Form
              </CardTitle>
              <CardDescription>
                Fill up the form and we will handle the rest.
              </CardDescription>
            </div>

            <div className="flex gap-3">
              <Image
                className="w-auto"
                src="/img/ph_flag.png"
                width={80}
                height={80}
                alt="ph"
              />
              <Image
                className="w-auto"
                src="/img/tinambac-seal.png"
                width={60}
                height={60}
                alt="Seal"
              />
              <Image
                className="w-auto rounded-full"
                src="/img/disability.png"
                width={60}
                height={60}
                alt="disability"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ApplicationForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
