import { Disability, Pwd } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@/prisma";



function excludeKey<T extends Record<string, any>>(
  obj: T,
  keyToExclude: keyof T
): Omit<T, typeof keyToExclude> {
  const { [keyToExclude]: excludedKey, ...rest } = obj;
  return rest;
}

export async function POST(request: Request) {

try {
  const prevPwdData = await request.json() // this contains key 'occcupation' which is nullable in prisma 

const newPwdData: any = excludeKey(prevPwdData, 'occupation'); // remove 'occupation' prevent error

  const existingPwd = await prisma.pwd.findUnique({
      where: { pwdNumber: newPwdData.pwdNumber },
    });

    if (existingPwd) {
      // If pwdNumber is already taken, return an error response
      return NextResponse.json(
        { error: "PWD number is already taken" },
        { status: 400 }
      );
    }

  const createData: any = {
    ...newPwdData,
    birthDate: new Date(newPwdData.birthDate),
    barangay: {
      connect: {
        id: parseInt(newPwdData.barangay)
      }
    },
    disability: {
      connect: (newPwdData.disability).map((id:number) => ({ id }))
    },
    disabilityCause: {
      connect: newPwdData.disabilityCause.map((id: number) => ({ id }))
    },
  }

  if(prevPwdData.occupation){
    createData.occupation = {
        connect: {
          id: parseInt(prevPwdData.occupation),
        },
      };
  }
  const res:Pwd = await prisma.pwd.create({
      data: createData,
      include: {
        disability: true,
        disabilityCause: true,
        occupation: true,
        barangay: true,
      },
})

    return NextResponse.json({ pwdId: newPwdData.pwdNumber });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}


export async function GET(){
  const pwd = await prisma.pwd.findMany({
    include: {
      disability: true,
      barangay:true,
      disabilityCause: true,
      occupation: true
    }
  })

  pwd.map(val=> console.log(val.disability))
  return NextResponse.json(pwd);
}