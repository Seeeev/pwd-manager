'use client';

import { OptionType } from "@/components/MultiSelect2";
import { Disability, DisabilityCause, Occupation, Barangay } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";


const useOptions = ()=> {

     const disability = useQuery<Disability[]>({
    queryKey: ["disability"],
    queryFn: () => fetch("api/disability").then((val) => val.json()),
  });

   const disabilityCause = useQuery<DisabilityCause[]>({
    queryKey: ["disabilityCause"],
    queryFn: () => fetch("api/disabilityCause").then((val) => val.json()),
  });

   const occupation = useQuery<Occupation[]>({
    queryKey: ["occupation"],
    queryFn: () =>
      fetch("api/occupation", { method: "GET" }).then((val) => val.json()),
  });
   const barangay = useQuery<Barangay[]>({
    queryKey: ["barangay"],
    queryFn: () =>
      fetch("api/barangay", { method: "GET" }).then((val) => val.json()),
  });

   let optionsDisability: OptionType[] = disability?.data || [];

   let optionsDisabilityCause: OptionType[] = disabilityCause?.data || [];

   let optionsOccupation: { id: number; name: String }[] =
    occupation?.data || [];

   let optionsBarangay: { id: number; name: String }[] = barangay?.data || [];



   return{
    optionsBarangay,
    optionsDisability,
    optionsDisabilityCause,
    optionsOccupation
   }
}


export default useOptions;


