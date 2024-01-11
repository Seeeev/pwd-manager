"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useOptions from "@/lib/get-pwd-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Barangay } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  body: z.string().min(5).max(5000),
});

export default function AddAnnoucementDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      fetch("/api/announcement", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((val) => val.json()),
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success",
          description: "An announcement has been posted",
        });
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
        });
      }
    },
    onError: (data) => {
      console.log(data);
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
        <Button>+ Annoucement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an annoucement</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write something here..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
