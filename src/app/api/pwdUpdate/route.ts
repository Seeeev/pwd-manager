import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { PWD } from "../../../../types/pwd-type";
import { Pwd } from "@prisma/client";

export async function POST(request: Request) {
  const data = await request.json();

  try {

    const pwd = await prisma.pwd.findUnique({
      where: {
        pwdNumber: data.pwdNumber,
      },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        imageUrls: true,
        occupation: true,
      },
    });
    return NextResponse.json(pwd);
  } catch (error) {
    return NextResponse.json("error");
  }
}



function excludeKey<T extends Record<string, any>>(
  obj: T,
  keyToExclude: keyof T
): Omit<T, typeof keyToExclude> {
  const { [keyToExclude]: excludedKey, ...rest } = obj;
  return rest;
}

export async function PUT(request: Request) {
    
  try {
    const prevPwdData = await request.json() // this contains key 'occcupation' which is nullable in prisma 

  const newPwdData: any = excludeKey(prevPwdData, 'occupation'); // remove 'occupation' prevent error
  

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
  const res:Pwd = await prisma.pwd.update({
    where: {
        pwdNumber: prevPwdData.pwdNumber
    },
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
    return NextResponse.json(error);
  }
}
