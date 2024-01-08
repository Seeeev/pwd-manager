import { Barangay, Disability, DisabilityCause, ImageUrls, Occupation, Pwd } from "@prisma/client";

export type PWD = Pwd & {
  barangay: Barangay;
  disability: Disability[];
  disabilityCause: DisabilityCause[];
  imageUrls: ImageUrls[];
  occupation: Occupation;
};