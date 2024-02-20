import { NextResponse } from "next/server";
import prisma
 from "@/prisma";
export async function GET(request: Request){
    const { searchParams } = new URL(request.url);

  const barangayId = searchParams.get("barangayId");

  try {
  const pwd = await prisma.pwd.count({
    where: {
        status: 'approved',
        barangayId: parseInt(barangayId!)
    }
  });
  return NextResponse.json(pwd);
  }catch(error){
      return NextResponse.json({ error: "Error fetching data" }, { status: 400 });
  }
}