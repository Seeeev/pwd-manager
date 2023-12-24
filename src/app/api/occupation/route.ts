import prisma from "@/prisma";

export async function GET() {
  console.log('occupation called');
  const res = await prisma.occupation.findMany();

  return Response.json(res);
}