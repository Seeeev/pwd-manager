import prisma from "@/prisma";
import { NextResponse } from "next/server";


export async function GET(request:  Request){
    const { searchParams } = new URL(request.url);
const barangayId = searchParams.get('barangayId')
  try {
  const pwd = await prisma.pwd.findMany({
    where: {
        barangayId: parseInt(barangayId!)
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