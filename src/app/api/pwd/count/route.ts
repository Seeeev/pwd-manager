import { NextResponse } from "next/server";
import prisma
 from "@/prisma";
export async function GET(){

  try {
  const pwd = await prisma.pwd.count({
    where: {
        status: 'approved',
    }
  });
  return NextResponse.json(pwd);
  }catch(error){
      return NextResponse.json({ error: "Error fetching data" }, { status: 400 });
  }
}