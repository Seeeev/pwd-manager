"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { authSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import prisma from "@/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { AnyAaaaRecord } from "dns";

export default function AuthForm() {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof authSchema>) {
    signIn("credentials", {
      email: "admin@gmail.com",
      password: "password",
    });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  //   const mutation = useMutation({
  //     mutationFn: (data: { name: String; email: String; password: String }) =>
  //       fetch("api/user", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ data }),
  //       }),
  //     onSuccess: async (data) => {
  //       const res = await data.json();
  //       if (!res.error) {
  //         toast({
  //           title: "User created",
  //           description: (
  //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //               <code className="text-white">User created</code>
  //             </pre>
  //           ),
  //         });
  //       } else {
  //         toast({
  //           title: "Error",
  //           description: (
  //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //               <code className="text-white">{res.error}</code>
  //             </pre>
  //           ),
  //         });
  //       }
  //     },
  //     onError: () => {
  //       console.log("error");
  //     },
  //   });

  //   const onClick = async () => {
  //     console.log("clicked");

  //     const email = "admin1@gmail.com";
  //     const name = "admin1";
  //     const password = "password1";

  //     mutation.mutate({ name: name, email: email, password: password });
  //   };


  return (
    <Form {...form}>
      {/* <Button onClick={onClick}>Create account</Button> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
