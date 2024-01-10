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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Barangay, Role } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "barangay"]),
  barangay: z.string(),
});

export default function AddUserDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "barangay",
      barangay: "",
    },
  });

  const barangay = useQuery<Barangay[]>({
    queryKey: ["barangay"],
    queryFn: () =>
      fetch("/api/barangay", { method: "GET" }).then((val) => val.json()),
  });

  let optionsBarangay: { id: number; name: String }[] = barangay?.data || [];

  const mutation = useMutation({
    mutationFn: (data: { name: string }) =>
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((val) => val.json()),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success",
          description: data.success,
        });
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
        });
      }
    },
    onError: (data) => {
      toast({
        title: "Error",
        description: "An error occured.",
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    mutation.mutate(values);
  }
  return (
    <Dialog>
      <DialogTrigger className="pl-2 text-sm">
        <Button>+ User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new user</DialogTitle>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
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
