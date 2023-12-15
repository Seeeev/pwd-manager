"use client";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

export default function SingleImageDropzoneUsage() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(10);
  const [showProgress, setShowProgress] = useState(false);

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
                manualFileName: `12-1212-121-121111/${file.name}`,
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
