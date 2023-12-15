import prisma from "@/prisma";

export async function GET() {
  const res = await prisma.disabilityCause.findMany();
 
  return Response.json(res )
}