"use client";

import * as z from "zod";

const phoneNumberFormat = () =>
  z.string().refine(
    (value) => {
      return value.startsWith("09") && value.length === 11; // '09' + 11 characters
    },
    {
      message: "Phone number format must start with '09' and length must be 11",
    }
  );

// Custom date validation function
const isDateValid = (str: string): boolean => {
  // Regular expression for "mm-dd-yyyy" format
  const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/;

  return dateRegex.test(str);
};

const dateValidationFormat = () =>
  z.string().refine((value) => isDateValid(value), {
    message: 'Invalid date format. Use "mm-dd-yyyy".',
  });

// PWD ID format
const customIdFormat = () =>
  z.string().refine(
    (value) => {
      const regex = /^(\d{2})-(\d{2})(\d{2})-(\d{3})-(\d{6})$/;
      const match = value.match(regex);

      if (!match) {
        return false;
      }

      // Extracting parts of the ID
      const [fullMatch, RR, PP, MM, BBB, NNNNNN] = match;

      // Checking the validity of each part
      const isValid =
        parseInt(RR, 10) >= 0 &&
        parseInt(PP, 10) >= 0 &&
        parseInt(MM, 10) >= 0 &&
        parseInt(BBB, 10) >= 0 &&
        parseInt(NNNNNN, 10) >= 0;

      return isValid;
    },
    {
      message: 'Invalid ID format. Use "RR-PPMM-BBB-NNNNNN".',
    }
  );

// console.log(disabilities);

export const pwdSchema = z.object({
  pwdNumber: customIdFormat(),
  firstName: z.string().min(1),
  middleName: z.string().nullable(),
  lastName: z.string().min(1),
  suffix: z.string().nullable(),
  streetName: z.string().nullable(),
  barangay: z.string().min(1, { message: "Must provide input" }),
  municipality: z.string().min(1, { message: "Must provide input" }),
  province: z.string().min(1, { message: "Must provide input" }),
  region: z.string().min(1, { message: "Must provide input" }),
  landline: z.string().nullable(),
  mobileNumber: phoneNumberFormat(),
  emailAddress: z.string().email().nullable(),
  birthDate: dateValidationFormat(),
  gender: z.string(),
  civilStatus: z.string(),
  bloodType: z.string().nullable(),
  educationalAttainment: z
    .string()
    .min(1, { message: "Select if applicable" })
    .nullable(),
  employmentStatus: z
    .string()
    .min(1, { message: "Select if applicable" })
    .nullable(),
  occupation: z.string().min(1, { message: "Select if applicable" }).nullable(),
  affiliatedPerson: z.string().nullable(),
  affiliatedAddress: z.string().nullable(),
  affiliatedContactNumber: phoneNumberFormat().nullable(),
  sssNumber: z.string().nullable(),
  gsisNumber: z.string().nullable(),
  psnNumber: z.string().nullable(),
  philhealthNumber: z.string().nullable(),
  isPhilhealthMember: z.boolean().nullable(),
  isPhilhealthMemberDependent: z.boolean().nullable(),
  fathersFirstName: z.string().nullable(),
  fathersMiddleName: z.string().nullable(),
  fathersLastName: z.string().nullable(),
  mothersFirstName: z.string().nullable(),
  mothersMiddleName: z.string().nullable(),
  mothersLastName: z.string().nullable(),
  accomplishedBy: z.string(),
  isApplicant: z.boolean().nullable(),
  isGuardian: z.boolean().nullable(),
  isRepresentative: z.boolean().nullable(),
  disability: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  disabilityCause: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});
