"use client";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { ApparentImage, NonApparentImage, Pwd } from "@prisma/client";
import { useState } from "react";

type UploadImage = {
  description: String;
  path?: Partial<keyof ApparentImage | NonApparentImage>;
};

export default function SingleImageDropzoneUsage() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(10);
  const [showProgress, setShowProgress] = useState(false);
  const [isApparent, setIsApparent] = useState<boolean | null>(true);

  const baseUrl = "12345";

  const apparent: UploadImage[] = [
    {
      description: "1 piece recent ID picture 1x1",
      path: "pathAId1x1",
    },
    {
      description: "1 piece recent ID picture 2x2",
      path: "pathAId2x2",
    },
    {
      description: "1 piece whole boldy picture(if physical disability)",
      path: "pathAWholeBody",
    },
    {
      description: "Medical Cerification",
      path: "pathAMedicalCertificate",
    },
    {
      description: "Certificate of Barangay Residency or valid ID",
      path: "pathABarangayResidency",
    },
    {
      description: "Birth Certificate",
      path: "pathABirthCertificate",
    },
  ];

  return (
    <div className="w-screen h-screen gap-2 bg-black flex flex-col items-center justify-center">
      <div>
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
        {/* {showProgress != false ? (
          <Progress value={progress} className="w-[200px] h-[10px]" />
        ) : null} */}
        {showProgress && (
          <Progress value={progress} className="w-[200px] h-[5px]" />
        )}
      </div>
      <Button
        className="w-[200px]"
        onClick={async () => {
          if (file) {
            setShowProgress(true); // show progress bar
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                console.log(progress);
                setProgress(progress);
                if (progress == 0) {
                  setProgress(10);
                }
                if (progress == 100) {
                  setShowProgress(false);
                }
              },
              options: {
                manualFileName: `${baseUrl}/${file.name}`,
              },
            });
            toast({
              title: "Success",
              description: "Image uploaded successfuly!",
            });

            console.log(res);
          }
        }}
      >
        Upload
      </Button>
    </div>
  );
}
