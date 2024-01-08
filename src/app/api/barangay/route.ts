import prisma from "@/prisma";

export async function GET() {
  const res = await prisma.barangay.findMany();
  
  return Response.json(res)
}