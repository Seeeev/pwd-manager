import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Prisma } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type Barangay = Prisma.BarangayGetPayload<{
  include: { pwd: true };
}>;
interface DeleteBarangayDialogProps {
  mutation: any;
  barangay: Barangay;
}
export default function DeleteBarangayDialog({
  mutation,
  barangay,
}: DeleteBarangayDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="pl-2 text-sm">Delete</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this barangay?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => mutation.mutate(barangay)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
