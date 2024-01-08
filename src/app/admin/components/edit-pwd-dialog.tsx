import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/zustand-states/states";
import {
  Barangay,
  Disability,
  DisabilityCause,
  ImageUrls,
  Occupation,
  Pwd,
} from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import EditForm from "./edit-form";

interface EditPwdDialog {
  pwdNumber: String;
  query: any
}

export default function EditPwdDialog({ pwdNumber, query }: EditPwdDialog) {
  const { data, isError, isSuccess, mutate, error, isPending } = useMutation({
    mutationFn: (data: { pwdNumber: String }) =>
      fetch("api/pwdUpdate", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((val) => val.json()),
  });

    const mutationUpdate = useMutation({
      mutationFn: (data: { pwdNumber: String }) =>
        fetch("api/pwdUpdate", {
          method: "PATCH",
          body: JSON.stringify(data),
        }).then((val) => val.json()),
    });



  useEffect(() => mutate({ pwdNumber: pwdNumber }), []);

  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      {isError && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>An error occured</DialogTitle>
            <DialogDescription>{error.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
      {isPending && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading..</DialogTitle>
            <DialogDescription>
              {"Fetching data, please wait"}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
      {isSuccess && (
        <>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit PWD </DialogTitle>
              <DialogDescription>Start editing</DialogDescription>
            </DialogHeader>
            {/* for used to edit pwd data */}
            <ScrollArea className="h-[400px] w-full  p-4">
              <EditForm query={query}data={data} />
            </ScrollArea>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
