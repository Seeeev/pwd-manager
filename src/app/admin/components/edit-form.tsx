"use client";

import { Input } from "@/components/ui/input";
import { PWD } from "../../../../types/pwd-type";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { pwdSchema } from "@/schema/PwdForm";
import useOptions from "@/lib/get-pwd-options";
import CustomSelectField from "@/components/CustomSelectField";
import { gender } from "@/app/constants/gender";
import { civilStatus } from "@/app/constants/civilStatus";
import { bloodTypes } from "@/app/constants/bloodTypes";
import { MultiSelect } from "@/components/MultiSelect2";
import { educationalAttainment } from "@/app/constants/educationalAttainment";
import { employmentStatus } from "@/app/constants/employmentStatus";
import CustomCheckbox from "@/components/CustomCheckbox2";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertCircle } from "lucide-react";

interface EditFormProps {
  data: PWD;
  query: any;
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate.replace(/\//g, "-");
}

export default function EditForm({ data, query }: EditFormProps) {
  const { toast } = useToast();
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof pwdSchema>>({
    resolver: zodResolver(pwdSchema),
    defaultValues: {
      accomplishedBy: data.accomplishedBy,
      affiliatedAddress: data.affiliatedAddress,
      affiliatedContactNumber: data.affiliatedContactNumber,
      affiliatedPerson: data.affiliatedPerson,
      barangay: data.barangay.id.toString(),
      birthDate: formatDate(data.birthDate),
      bloodType: data.bloodType,
      civilStatus: data.civilStatus,
      disability: data.disability.map((val) => val.id),
      disabilityCause: data.disabilityCause.map((val) => val.id),
      educationalAttainment: data.educationalAttainment,
      emailAddress: data.emailAddress,
      employmentStatus: data.employmentStatus,
      fathersFirstName: data.fathersFirstName,
      fathersLastName: data.fathersLastName,
      fathersMiddleName: data.fathersMiddleName,
      firstName: data.firstName,
      gender: data.gender,
      gsisNumber: data.gsisNumber,
      isApplicant: data.isApplicant,
      isGuardian: data.isGuardian,
      isPhilhealthMember: data.isPhilhealthMember,
      isPhilhealthMemberDependent: data.isPhilhealthMemberDependent,
      isRepresentative: data.isRepresentative,
      landline: data.landline,
      lastName: data.lastName!,
      middleName: data.middleName,
      mobileNumber: data.mobileNumber,
      mothersFirstName: data.mothersFirstName,
      mothersLastName: data.mothersLastName,
      mothersMiddleName: data.middleName,
      occupation: data.occupation ? data.occupation.id.toString() : null,
      philhealthNumber: data.philhealthNumber,
      psnNumber: data.psnNumber,
      pwdNumber: data.pwdNumber,
      sssNumber: data.sssNumber,
      streetName: data.streetName,
      suffix: data.suffix,
      isApparent: data.isApparent!
    },
  });

  function onSubmit(values: z.infer<typeof pwdSchema>) {
    setIsDisabled(true); // disable submit button to prevent multiple requests
    mutation.mutate(values);
  }

  const mutation = useMutation({
    mutationFn: (data: any) =>
      fetch("api/pwdUpdate", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      query.refetch();
      setIsDisabled(false);
      toast({
        title: "Success",
        description: "PWD data has been updated",
      });
    },
    onError: (error) => {
      setIsDisabled(false);
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const {
    optionsDisability,
    optionsDisabilityCause,
    optionsOccupation,
    optionsBarangay,
  } = useOptions();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          control={form.control}
          name="pwdNumber"
          label="PWD Number"
          isReadOnly={true}
          isRequired={true}
        />
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
          isRequired={true}
        />
        <CustomFormField
          control={form.control}
          name="suffix"
          label="Suffix"
          isRequired={true}
        />
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

        <div className="flex gap-2">
          <div className="flex-1">
            <CustomCheckbox
              control={form.control}
              label={"Apparent Disability"}
              name="isApparent"
            />
          </div>
          <Popover>
            <PopoverTrigger>
              <AlertCircle className=" w-5 text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="text-xs">
              An <span className="text-primary">apparent</span> disability is
              one that is easily noticeable or visible to others. A{" "}
              <span className="text-primary">non-apparent</span> disability, on
              the other hand, is not immediately visible or obvious to others.
            </PopoverContent>
          </Popover>
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

        <CustomFormField
          control={form.control}
          name="streetName"
          label="Street"
        />
        <CustomSelectField
          control={form.control}
          data={optionsBarangay}
          name="barangay"
          label="Barangay"
          placeholder="Select your barangay"
          isRequired={true}
        />

        <CustomFormField
          control={form.control}
          name="landline"
          label="Landline"
          type="number"
        />

        <CustomFormField
          control={form.control}
          name="mobileNumber"
          label="Mobile Number"
          isRequired={true}
          type="number"
        />

        <CustomFormField
          control={form.control}
          name="emailAddress"
          label="Email Address"
        />
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
        <CustomCheckbox
          control={form.control}
          label={"Philheath Member"}
          name="isPhilhealthMember"
        />
        <CustomCheckbox
          control={form.control}
          label={"Philheath Member Dependent"}
          name="isPhilhealthMemberDependent"
        />
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

        <CustomFormField control={form.control} name="accomplishedBy" />
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

        <Button disabled={isDisabled} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
