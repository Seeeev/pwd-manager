"use client";

import {
  Barangay,
  Disability,
  DisabilityCause,
  ImageUrls,
  Occupation,
  Pwd,
} from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import EditForm from "./edit-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddForm from "./add-pwd-form";
import { usePwdNumberStore, useTabStore } from "@/zustand-states/states";
import MultiImageDropzoneUsage from "@/app/upload/[slug]/multi-image-dropzone-usage";

export default function AddPwdDialog() {
  const mutationUpdate = useMutation({
    mutationFn: (data: { pwdNumber: String }) =>
      fetch("api/pwdUpdate", {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then((val) => val.json()),
  });

  // const [tab, setTab] = useState("info");

  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setTab);

  const pwdId = usePwdNumberStore((state) => state.pwdNumber);

  const onTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm">
        <Button>+ Create new PWD</Button>
      </DialogTrigger>
      <>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create</DialogTitle>
            <DialogDescription>
              Creating new PWD will automatically be approved
            </DialogDescription>
          </DialogHeader>
          <Tabs value={tab} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">General Info</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ScrollArea className="h-[200px]">
                    <AddForm />
                  </ScrollArea>

                  {/* <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div> */}
                </CardContent>
                {/*                 
                <CardFooter>
                  <Button onClick={() => setTab("requirements")}>
                    Save changes
                  </Button>
                </CardFooter> */}
              </Card>
            </TabsContent>
            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                  <CardDescription>Upload requirements.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div> */}

                  {pwdId ? (
                    <ScrollArea className="h-[250px]">
                      <MultiImageDropzoneUsage
                        baseUrl={pwdId.toString()}
                        redirect={false}
                      />
                    </ScrollArea>
                  ) : (
                    "Fill up the form first"
                  )}
                </CardContent>
                {/* <CardFooter>
                  <Button onClick={() => console.log(pwdId)}>
                    Save password
                  </Button>
                </CardFooter> */}
              </Card>
            </TabsContent>
          </Tabs>
          {/* for used to edit pwd data */}
          {/* <ScrollArea className="h-[400px] w-full  p-4">
            <EditForm query={query} data={data} />
          </ScrollArea> */}
        </DialogContent>
      </>
    </Dialog>
  );
}
