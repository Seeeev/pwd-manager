import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(request: Request){
const { searchParams } = new URL(request.url);
const pwdNumber = searchParams.get('id')
  try {
  const pwd = await prisma.pwd.findMany({
    where: {
        pwdNumber: pwdNumber!
    },
    include: {
      disability: true,
      barangay:true,
      disabilityCause: true,
      occupation: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return NextResponse.json(pwd);
  }catch(error){
    console.log(error)
      return NextResponse.json({ error: "Error fetching data" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const pwdNumber = await request.json()
  
  return NextResponse.json({})
}