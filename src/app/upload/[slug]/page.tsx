import MultiImageDropzoneUsage from "./multi-image-dropzone-usage";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  return (
    <>
      <div className="flex m-10">
        <Image
          className="w-auto flex-none"
          src="/img/ph_flag.png"
          width={80}
          height={80}
          alt="ph"
        />
        <h2 className="scroll-m-20 pb-2 text-3xl text-center text-primary font-semibold tracking-tight first:mt-0 grow">
          Persons with Disability
        </h2>
        <div className="flex gap-3 flex-none">
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
      <div className="flex gap-3 flex-col-reverse mx-10">
        <div className=" bg-secondary ">
          <MultiImageDropzoneUsage baseUrl={params.slug} redirect={true} />
        </div>

        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle className="">
                PWD requirements for{" "}
                <span className="text-primary">apparent</span> disability
              </CardTitle>
              <CardDescription>Upload images as listed below</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
                <li>1pc recent ID pictures of 1x1 and 2x2.</li>
                <li>1pc whole body picture(if physical disability).</li>
                <li>Medical Certification.</li>
                <li>Certificate of Barangay Recidency or valid ID.</li>
                <li>Birth Certificate</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="">
                PWD requirements for{" "}
                <span className="text-primary">non apparent</span> disability
              </CardTitle>
              <CardDescription>Upload images as listed below</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
                <li>1pc recent ID pictures of 1x1 and 2x2.</li>
                <li>
                  One valid Governement ID (for children student ID will be
                  accepted/Birth Cerificate will be required).
                </li>
                <li>Certificate of Barangay Residency</li>
              </ul>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Whereas, for guardian representative:
              </p>
              <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
                <li>Guardian proof of guardianship</li>
                <li>
                  Authorized representative, notarized authorization letter
                </li>
              </ul>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Note: For cancer and rare diseases applicants, a Medical
                Certificate/Certificate of Disability issued by an Oncologist
                Surgeon or appropriate physician that has the experties to
                determine the ailments or disease is required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
