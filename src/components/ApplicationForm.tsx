"use client";
import CustomFormField from "@/components/CustomFormField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pwdSchema } from "@/schema/PwdForm";
import { toast } from "@/components/ui/use-toast";
import { MultiSelect, OptionType } from "@/components/MultiSelect2";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  Barangay,
  Disability,
  DisabilityCause,
  Occupation,
  Pwd,
} from "@prisma/client";
import CustomSelectField from "@/components/CustomSelectField";
import { gender } from "@/app/constants/gender";
import { civilStatus } from "@/app/constants/civilStatus";
import { bloodTypes } from "@/app/constants/bloodTypes";
import CardContainer from "./CardContainer";
import { educationalAttainment } from "@/app/constants/educationalAttainment";
import { employmentStatus } from "@/app/constants/employmentStatus";
import CustomCheckbox from "./CustomCheckbox2";
import { ToastAction } from "./ui/toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import useOptions from "@/lib/get-pwd-options";
import { AlertCircle } from "lucide-react";
// import { optionsDisability, optionsDisabilityCause, optionsBarangay, optionsOccupation } from "@/lib/get-pwd-options";

export default function ApplicationForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof pwdSchema>>({
    mode: "onChange",
    resolver: zodResolver(pwdSchema),
    defaultValues: {
      pwdNumber: "",
      suffix: null,
      middleName: null,
      lastName: "",
      firstName: "",
      accomplishedBy: "",
      barangay: undefined,
      birthDate: "",
      bloodType: undefined,
      civilStatus: undefined,
      gender: undefined,
      mobileNumber: "",
      streetName: null,
      disability: [],
      disabilityCause: [],
      educationalAttainment: null,
      employmentStatus: null,
      occupation: null,
      emailAddress: null,
      landline: null,
      sssNumber: null,
      gsisNumber: null,
      psnNumber: null,
      philhealthNumber: null,
      isPhilhealthMember: true,
      isPhilhealthMemberDependent: false,
      affiliatedAddress: null,
      affiliatedContactNumber: null,
      affiliatedPerson: null,
      fathersFirstName: null,
      fathersLastName: null,
      fathersMiddleName: null,
      mothersFirstName: null,
      mothersLastName: null,
      mothersMiddleName: null,
      isApplicant: false,
      isGuardian: false,
      isRepresentative: false,
      isApparent: false,
    },
  });

  function onSubmit(values: z.infer<typeof pwdSchema>) {
    setDisabled(true);
    mutation.mutate(values);
  }

  // const disability = useQuery<Disability[]>({
  //   queryKey: ["disability"],
  //   queryFn: () => fetch("api/disability").then((val) => val.json()),
  // });

  // const disabilityCause = useQuery<DisabilityCause[]>({
  //   queryKey: ["disabilityCause"],
  //   queryFn: () => fetch("api/disabilityCause").then((val) => val.json()),
  // });

  // const occupation = useQuery<Occupation[]>({
  //   queryKey: ["occupation"],
  //   queryFn: () =>
  //     fetch("api/occupation", { method: "GET" }).then((val) => val.json()),
  // });
  // const barangay = useQuery<Barangay[]>({
  //   queryKey: ["barangay"],
  //   queryFn: () =>
  //     fetch("api/barangay", { method: "GET" }).then((val) => val.json()),
  // });

  // let optionsDisability: OptionType[] = disability?.data || [];

  // let optionsDisabilityCause: OptionType[] = disabilityCause?.data || [];

  // let optionsOccupation: { id: number; name: String }[] =
  //   occupation?.data || [];

  // let optionsBarangay: { id: number; name: String }[] = barangay?.data || [];

  const mutation = useMutation({
    mutationFn: (formValues: z.infer<typeof pwdSchema>) =>
      fetch("api/pwd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }),
    onSuccess: async (data, variables, context) => {
      setDisabled(false);
      const res = await data.json();
      console.log(res);
      if (res.error) {
        form.setError("pwdNumber", { message: "PWD number already exists." });
        toast({
          title: "Error",
          description: res.error,
          action: <ToastAction altText="ok">ok</ToastAction>,
        });
      } else {
        setDisabled(false);
        toast({
          title: "Success",
          description:
            "Application has been submitted. Redirecting to file uploads, plese wait..",
          action: <ToastAction altText="ok">ok</ToastAction>,
        });
        form.reset();
        mutation.reset();

        setTimeout(() => {
          router.push(`/upload/${res.pwdId}`);
        }, 2000);
      }
    },

    onError: (error) => {
      toast({
        title: error.name,
        description: error.message,
        action: <ToastAction altText="ok">ok</ToastAction>,
      });
    },
  });

  // gets the list of options and render out as a dropdown or select
  const {
    optionsDisability,
    optionsDisabilityCause,
    optionsOccupation,
    optionsBarangay,
  } = useOptions();

  const [isDisabled, setDisabled] = useState(false); // used to enable or disable submit button

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        <CustomFormField
          control={form.control}
          name="pwdNumber"
          label="PWD Number"
          isRequired={true}
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              name="lastName"
              label="Last Name"
              isRequired={true}
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              name="firstName"
              label="First Name"
              isRequired={true}
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              name="middleName"
              label="Middle Name"
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              name="suffix"
              label="Suffix"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              name="birthDate"
              label="Birth Date"
              isRequired={true}
            />
          </div>
          <div className="flex-1">
            <CustomSelectField
              control={form.control}
              data={gender}
              name="gender"
              label="Gender"
              placeholder="Select your gender"
              isRequired={true}
            />
          </div>

          <div className="flex-1">
            <CustomSelectField
              control={form.control}
              data={civilStatus}
              name="civilStatus"
              label="Civil Status"
              placeholder="Select your civil status"
              isRequired={true}
            />
          </div>
          <div className="flex-1">
            <CustomSelectField
              control={form.control}
              data={bloodTypes}
              name="bloodType"
              label="Blood type"
              placeholder="Select your blood type"
              isRequired={true}
            />
          </div>
        </div>
        <div className="flex gap-3 ">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="disability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type of Disability
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <MultiSelect
                    selected={field.value}
                    options={optionsDisability}
                    {...field}
                    className="sm:w-[510px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-6">
            <div className="flex gap-2">
              <CustomCheckbox
                control={form.control}
                label={"Apparent Disability"}
                name="isApparent"
              />
              <Popover>
                <PopoverTrigger>
                  <AlertCircle className=" w-5 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent className="text-xs">
                  An <span className="text-primary">apparent</span> disability
                  is one that is easily noticeable or visible to others. A{" "}
                  <span className="text-primary">non-apparent</span> disability,
                  on the other hand, is not immediately visible or obvious to
                  others.
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="disabilityCause"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cause of Disability<span className="text-red-500">*</span>
              </FormLabel>
              <MultiSelect
                selected={field.value}
                options={optionsDisabilityCause}
                {...field}
                className="sm:w-[510px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <CardContainer description="Address Details">
          <div className="flex sm:flex-row flex-col gap-2">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="streetName"
                label="Street"
              />
            </div>
            <div className="flex-1">
              <div className="flex-1">
                <CustomSelectField
                  control={form.control}
                  data={optionsBarangay}
                  name="barangay"
                  label="Barangay"
                  placeholder="Select your barangay"
                  isRequired={true}
                />
              </div>
            </div>
          </div>
        </CardContainer>

        <CardContainer description="Contact Details">
          <div className=" flex gap-2 ">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="landline"
                label="Landline"
                type="number"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="mobileNumber"
                label="Mobile Number"
                isRequired={true}
                type="number"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="emailAddress"
                label="Email Address"
              />
            </div>
          </div>
        </CardContainer>

        <CardContainer description="Career Factors">
          <div className="flex gap-2">
            <div className="flex-1">
              <CustomSelectField
                control={form.control}
                label={"Educational Attainment"}
                name="educationalAttainment"
                data={educationalAttainment}
                placeholder={"Select if applicable"}
              />
            </div>

            <div className="flex-1">
              <CustomSelectField
                control={form.control}
                label={"Employement status"}
                name="employmentStatus"
                data={employmentStatus}
                placeholder={"Select if applicable"}
              />
            </div>

            <div className="flex-1">
              <CustomSelectField
                control={form.control}
                label={"Occupation"}
                name="occupation"
                data={optionsOccupation}
                placeholder={"Select if applicable"}
              />
            </div>
          </div>
        </CardContainer>

        <CardContainer description="Organization Affiliated">
          <div className=" flex gap-2 ">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="affiliatedPerson"
                label="Contact Person"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="affiliatedAddress"
                label="Office Address"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="affiliatedContactNumber"
                label="Tel #"
              />
            </div>
          </div>
        </CardContainer>

        <CardContainer description="ID Reference Number">
          <div className="flex flex-col gap-2">
            <div className=" flex gap-2 ">
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  name="sssNumber"
                  label="SSS #"
                />
              </div>
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  name="gsisNumber"
                  label="GSIS #"
                />
              </div>
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  name="psnNumber"
                  label="PSN #"
                />
              </div>
              <div className="flex-1">
                <CustomFormField
                  control={form.control}
                  name="philhealthNumber"
                  label="PhilHealth #"
                />
              </div>
            </div>
            <CustomCheckbox
              control={form.control}
              label={"Philheath Member"}
              name="isPhilhealthMember"
            />

            {/* Checkbox for Philhealth Member Dependent */}
            <CustomCheckbox
              control={form.control}
              label={"Philheath Member Dependent"}
              name="isPhilhealthMemberDependent"
            />
          </div>
        </CardContainer>

        <CardContainer description="Family Background">
          <div className="flex gap-2">
            <div className="w-28">
              <p className="text-sm text-muted-foreground pt-10 whitespace-nowrap">
                Fathers Name
              </p>
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="fathersLastName"
                label="Last Name"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="fathersFirstName"
                label="First Name"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="fathersMiddleName"
                label="Middle Name"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <p className="text-sm text-muted-foreground pt-10  whitespace-nowrap w-28">
              Mothers Name
            </p>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="mothersLastName"
                label="Last Name"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="mothersFirstName"
                label="First Name"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                name="mothersMiddleName"
                label="Middle Name"
              />
            </div>
          </div>
        </CardContainer>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-3">
            <p className="text-sm text-muted-foreground pt-4">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Accomplished by
                <span className="text-red-500">&#42;</span>
              </span>
            </p>
          </div>
          <div className="flex-1">
            <CustomFormField control={form.control} name="accomplishedBy" />
          </div>

          <div className="flex-1">
            <CustomCheckbox
              control={form.control}
              label={"Applicant"}
              name="isApplicant"
            />
          </div>
          <div className="flex-1">
            <CustomCheckbox
              control={form.control}
              label={"Guardian"}
              name="isGuardian"
            />
          </div>

          <div className="flex-1">
            <CustomCheckbox
              control={form.control}
              label={"Representative"}
              name="isRepresentative"
            />
          </div>
        </div>

        <Button type="submit" disabled={isDisabled} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
    // </main>
  );
}
