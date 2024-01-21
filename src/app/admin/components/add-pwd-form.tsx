import { bloodTypes } from "@/app/constants/bloodTypes";
import { civilStatus } from "@/app/constants/civilStatus";
import { educationalAttainment } from "@/app/constants/educationalAttainment";
import { employmentStatus } from "@/app/constants/employmentStatus";
import { gender } from "@/app/constants/gender";
import CustomCheckbox from "@/components/CustomCheckbox2";
import CustomFormField from "@/components/CustomFormField";
import CustomSelectField from "@/components/CustomSelectField";
import { MultiSelect } from "@/components/MultiSelect2";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import useOptions from "@/lib/get-pwd-options";
import { pwdSchema } from "@/schema/PwdForm";
import { usePwdNumberStore, useTabStore } from "@/zustand-states/states";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddForm() {
  const [isDisabled, setDisabled] = useState(false);
  const setPwdId = usePwdNumberStore((state) => state.setPwdNumber);
  const setTab = useTabStore((state) => state.setTab); // used to switch tabs between 'info' and 'requirements'

  const form = useForm<z.infer<typeof pwdSchema>>({
    resolver: zodResolver(pwdSchema),
    mode: "onChange",
    defaultValues: {
      //   accomplishedBy: data.accomplishedBy,
      //   affiliatedAddress: data.affiliatedAddress,
      //   affiliatedContactNumber: data.affiliatedContactNumber,
      //   affiliatedPerson: data.affiliatedPerson,
      //   barangay: data.barangay.id.toString(),
      //   birthDate: formatDate(data.birthDate),
      //   bloodType: data.bloodType,
      //   civilStatus: data.civilStatus,
      //   disability: data.disability.map((val) => val.id),
      //   disabilityCause: data.disabilityCause.map((val) => val.id),
      //   educationalAttainment: data.educationalAttainment,
      //   emailAddress: data.emailAddress,
      //   employmentStatus: data.employmentStatus,
      //   fathersFirstName: data.fathersFirstName,
      //   fathersLastName: data.fathersLastName,
      //   fathersMiddleName: data.fathersMiddleName,
      //   firstName: data.firstName,
      //   gender: data.gender,
      //   gsisNumber: data.gsisNumber,
      //   isApplicant: data.isApplicant,
      //   isGuardian: data.isGuardian,
      //   isPhilhealthMember: data.isPhilhealthMember,
      //   isPhilhealthMemberDependent: data.isPhilhealthMemberDependent,
      //   isRepresentative: data.isRepresentative,
      //   landline: data.landline,
      //   lastName: data.lastName!,
      //   middleName: data.middleName,
      //   mobileNumber: data.mobileNumber,
      //   mothersFirstName: data.mothersFirstName,
      //   mothersLastName: data.mothersLastName,
      //   mothersMiddleName: data.middleName,
      //   occupation: data.occupation ? data.occupation.id.toString() : null,
      //   philhealthNumber: data.philhealthNumber,
      //   psnNumber: data.psnNumber,
      //   pwdNumber: data.pwdNumber,
      //   sssNumber: data.sssNumber,
      //   streetName: data.streetName,
      //   suffix: data.suffix,
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

  const mutation = useMutation({
    mutationFn: (formValues: z.infer<typeof pwdSchema>) =>
      fetch("/api/pwd", {
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
        setPwdId(res.pwdId);
        toast({
          title: "Success",
          description:
            "Application has been submitted. Redirecting to file uploads, plese wait..",
          action: <ToastAction altText="ok">ok</ToastAction>,
        });
        form.reset();
        setTab("requirements");
        mutation.reset();

        //   setTimeout(() => {
        //     router.push(`/upload/${res.pwdId}`);
        //   }, 2000);
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

  function onSubmit(values: z.infer<typeof pwdSchema>) {
    setDisabled(true); // disable submit button to prevent multiple requests
    // const newValues = { ...values, status: "approved" };
    // mutation.mutate(newValues);
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          control={form.control}
          name="pwdNumber"
          label="PWD Number"
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
          // isRequired={true}
        />
        <CustomFormField
          control={form.control}
          name="suffix"
          label="Suffix"
          // isRequired={true}
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

        <CustomFormField
          control={form.control}
          name="accomplishedBy"
          label="Accomplished by"
        />
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
