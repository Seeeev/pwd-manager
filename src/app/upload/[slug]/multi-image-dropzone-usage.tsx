"use client";
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "@tanstack/react-query";
import { url } from "inspector";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MultiImageDropzoneUsageProps {
  baseUrl: String;
  redirect: boolean;
}

export default function MultiImageDropzoneUsage({
  baseUrl,
  redirect = true,
}: MultiImageDropzoneUsageProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<String[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((prevFileStates) =>
      prevFileStates.map((fileState) =>
        fileState.key === key ? { ...fileState, progress } : fileState
      )
    );
  }

  const handleUpload = async (fileState: FileState) => {
    try {
      const res = await edgestore.publicFiles.upload({
        file: fileState.file as File,
        onProgressChange: async (progress) => {
          updateFileProgress(fileState.key, progress);
          if (progress === 100) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            updateFileProgress(fileState.key, "COMPLETE");
          }
        },
        options: {
          manualFileName: `${baseUrl}/${(fileState.file as File).name}`,
        },
      });

      // upload urls to database
      mutation.mutate({
        pwdNumber: baseUrl as string,
        url: res.url,
      });
    } catch (err) {
      updateFileProgress(fileState.key, "ERROR");
    }
  };

  const mutation = useMutation({
    mutationFn: (data: { pwdNumber: string; url: string }) =>
      fetch("/api/imageUrl", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: async (data) => {
      const res = await data.json();
      setLoading(false);

      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
        });
      } else {
        toast({
          title: "Success",
          description: redirect
            ? "Requirements have been uploaded. Redirecting to the main page, please wait..."
            : "Requirements have been uploaded. You can now close this dialog.",
        });
        redirect && (await setTimeout(() => router.push("/"), 2000));
      }
    },
    onError: () => {
      setLoading(false);
      toast({
        title: "Error",
        description:
          "Error uploading requirements, check your internet connection.",
      });
    },
  });

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
      />
      <Button
        className="w-full"
        onClick={async () => {
          setLoading(true);

          await Promise.all(fileStates.map(handleUpload));
        }}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
