"use client";

import CustomSelectField from "@/components/CustomSelectField";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Barangay, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(["admin", "barangay"]),
  barangay: z.string().nullable(),
});

const User: Prisma.UserInclude = {
  barangay: true,
};
interface EditUserProps {
  mutation: any;
  user: any;
}
export default function EditUserDialog({ user, mutation }: EditUserProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      barangay: user.barangay ? user.barangay.id.toString() : null,
    },
  });

  const barangay = useQuery<Barangay[]>({
    queryKey: ["barangay"],
    queryFn: () =>
      fetch("/api/barangay", { method: "GET" }).then((val) => val.json()),
  });

  let optionsBarangay: { id: number; name: String }[] = barangay?.data || [];

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newValues = {...values, id: user.id}
    mutation.mutate(newValues);
  }
  return (
    <Dialog>
      <DialogTrigger className="pl-2 text-sm">Edit</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="****@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomSelectField
              label="Barangay"
              name="barangay"
              data={optionsBarangay}
              control={form.control}
            />

            <CustomSelectField
              label="Role"
              name="role"
              data={[
                { label: "Admin", value: "admin" },
                { label: "Barangay", value: "barangay" },
              ]}
              control={form.control}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
