"use client";
import CustomFormField from "@/components/CustomFormField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pwdSchema } from "@/schema/PwdForm";
import { toast } from "@/components/ui/use-toast";
import { MultiSelect, OptionType } from "@/components/MultiSelect2";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { Disability, DisabilityCause, Occupation, Pwd } from "@prisma/client";
import CustomSelectField from "@/components/CustomSelectField";
import { gender } from "@/app/constants/gender";
import { civilStatus } from "@/app/constants/civilStatus";
import { bloodTypes } from "@/app/constants/bloodTypes";
import CardContainer from "./CardContainer";
import { educationalAttainment } from "@/app/constants/educationalAttainment";
import { employmentStatus } from "@/app/constants/employmentStatus";
import CustomCheckbox from "./CustomCheckbox2";
import { ToastAction } from "./ui/toast";

export default function ApplicationForm() {
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
      barangay: "",
      birthDate: "",
      bloodType: undefined,
      civilStatus: undefined,
      gender: undefined,
      mobileNumber: "",
      municipality: "",
      province: "",
      region: "",
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
    },
  });

  function onSubmit(values: z.infer<typeof pwdSchema>) {
    mutation.mutate(values);
  }

  const disability = useQuery<Disability[]>({
    queryKey: ["disability"],
    queryFn: () => fetch("api/disability").then((val) => val.json()),
  });

  let optionsDisability: OptionType[] = [];

  if (disability.data) {
    optionsDisability = disability.data.map(
      ({ pwdPwdNumber, ...rest }) => rest
    );
  }

  const disabilityCause = useQuery<DisabilityCause[]>({
    queryKey: ["disabilityCause"],
    queryFn: () => fetch("api/disabilityCause").then((val) => val.json()),
  });

  let optionsDisabilityCause: OptionType[] = [];

  if (disabilityCause.data) {
    optionsDisabilityCause = disabilityCause.data.map(
      ({ pwdPwdNumber, ...rest }) => rest
    );
  }

  const occupation = useQuery<Occupation[]>({
    queryKey: ["occupation"],
    queryFn: () =>
      fetch("api/occupation", { method: "GET" }).then((val) => val.json()),
  });

  let optionsOccupation: { id: number; name: String }[] = [];

  if (occupation.data) {
    optionsOccupation = occupation.data;
  }

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
      const res = await data.json();
      if (res.error) {
        form.setError("pwdNumber", { message: "PWD number already exists." });
        toast({
          title: "Error",
          description: res.error,
          action: <ToastAction altText="ok">ok</ToastAction>,
        });
      } else {
        toast({
          title: "Success",
          description: "Application has been submitted",
          action: <ToastAction altText="ok">ok</ToastAction>,
        });
        form.reset();
        mutation.reset();
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

  //   if (mutation.data) {
  //     console.log(mutation.data);
  //     if (mutation.data.status == 400) {
  //       toast({
  //         title: "Error",
  //         description: mutation.data.statusText,
  //         action: <ToastAction altText="Ok">Ok</ToastAction>,
  //       });
  //     }
  //   }

  return (
    // <main className="container mx-auto flex min-h-screen items-center justify-center">
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
          <CustomFormField
            control={form.control}
            name="lastName"
            label="Last Name"
            isRequired={true}
          />
          <CustomFormField
            control={form.control}
            name="firstName"
            label="First Name"
            isRequired={true}
          />
          <CustomFormField
            control={form.control}
            name="middleName"
            label="Middle Name"
          />
          <CustomFormField
            control={form.control}
            name="suffix"
            label="Suffix"
          />
        </div>

        <div className="flex gap-2">
          <CustomFormField
            control={form.control}
            name="birthDate"
            label="Birth Date"
            isRequired={true}
          />
          <CustomSelectField
            control={form.control}
            data={gender}
            name="gender"
            label="Gender"
            placeholder="Select your gender"
            isRequired={true}
          />
          <CustomSelectField
            control={form.control}
            data={civilStatus}
            name="civilStatus"
            label="Civil Status"
            placeholder="Select your civil status"
            isRequired={true}
          />
          <CustomSelectField
            control={form.control}
            data={bloodTypes}
            name="bloodType"
            label="Blood type"
            placeholder="Select your blood type"
            isRequired={true}
          />
        </div>

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
          <div className="flex gap-2">
            <CustomFormField
              control={form.control}
              name="streetName"
              label="Street"
            />
            <CustomFormField
              control={form.control}
              name="barangay"
              label="Barangay"
              isRequired={true}
            />
            <CustomFormField
              control={form.control}
              name="municipality"
              label="City/Municipality"
              isRequired={true}
            />
            <CustomFormField
              control={form.control}
              name="province"
              label="Province"
              isRequired={true}
            />
            <CustomFormField
              control={form.control}
              name="region"
              label="Region"
              isRequired={true}
            />
          </div>
        </CardContainer>

        <CardContainer description="Contact Details">
          <div className=" flex gap-2 ">
            <CustomFormField
              control={form.control}
              name="landline"
              label="Landline"
            />
            <CustomFormField
              control={form.control}
              name="mobileNumber"
              label="Mobile Number"
              isRequired={true}
            />
            <CustomFormField
              control={form.control}
              name="emailAddress"
              label="Email Address"
            />
          </div>
        </CardContainer>

        <CardContainer description="Career Factors">
          <div className="flex gap-2">
            <CustomSelectField
              control={form.control}
              label={"Educational Attainment"}
              name="educationalAttainment"
              data={educationalAttainment}
              placeholder={"Select if applicable"}
            />

            <CustomSelectField
              control={form.control}
              label={"Employement status"}
              name="employmentStatus"
              data={employmentStatus}
              placeholder={"Select if applicable"}
            />

            <CustomSelectField
              control={form.control}
              label={"Occupation"}
              name="occupation"
              data={optionsOccupation}
              placeholder={"Select if applicable"}
            />
          </div>
        </CardContainer>

        <CardContainer description="Organization Affiliated">
          <div className=" flex gap-2 ">
            <CustomFormField
              control={form.control}
              name="affiliatedPerson"
              label="Contact Person"
            />
            <CustomFormField
              control={form.control}
              name="affiliatedAddress"
              label="Office Address"
            />
            <CustomFormField
              control={form.control}
              name="affiliatedContactNumber"
              label="Tel #"
            />
          </div>
        </CardContainer>

        <CardContainer description="ID Reference Number">
          <div className="flex flex-col gap-2">
            <div className=" flex gap-2 ">
              <CustomFormField
                control={form.control}
                name="sssNumber"
                label="SSS #"
              />
              <CustomFormField
                control={form.control}
                name="gsisNumber"
                label="GSIS #"
              />
              <CustomFormField
                control={form.control}
                name="psnNumber"
                label="PSN #"
              />
              <CustomFormField
                control={form.control}
                name="philhealthNumber"
                label="PhilHealth #"
              />
            </div>
            <CustomCheckbox
              control={form.control}
              label={"Philheath Member"}
              name="isPhilhealthMember"
              //   onChange={(value) =>
              //     handleCheckboxChange("isPhilhealthMember", value)
              //   }
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
              <p className="text-sm text-muted-foreground pt-10">
                Fathers Name&semi;
              </p>
            </div>
            <CustomFormField
              control={form.control}
              name="fathersLastName"
              label="Last Name"
            />
            <CustomFormField
              control={form.control}
              name="fathersFirstName"
              label="First Name"
            />
            <CustomFormField
              control={form.control}
              name="fathersMiddleName"
              label="Middle Name"
            />
          </div>
          <div className="flex gap-2">
            <p className="text-sm text-muted-foreground pt-10">
              Mothers Name&semi;
            </p>
            <CustomFormField
              control={form.control}
              name="mothersLastName"
              label="Last Name"
            />
            <CustomFormField
              control={form.control}
              name="mothersFirstName"
              label="First Name"
            />
            <CustomFormField
              control={form.control}
              name="mothersMiddleName"
              label="Middle Name"
            />
          </div>
        </CardContainer>

        <div className="flex gap-2">
          <div className="flex flex-auto w-64">
            <p className="text-sm text-muted-foreground pt-5 w-[200px]">
              <span className="text-sm text-muted-foreground pt-5 w-[200px]">
                Accomplished by
                <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="w-full">
              <CustomFormField control={form.control} name="accomplishedBy" />
            </div>
          </div>

          <CustomCheckbox
            control={form.control}
            label={"Applicant"}
            name="isApplicant"
          />
          <CustomCheckbox
            control={form.control}
            label={"Guardian"}
            name="isGuardian"
          />

          <CustomCheckbox
            control={form.control}
            label={"Representative"}
            name="isRepresentative"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
    // </main>
  );
}
