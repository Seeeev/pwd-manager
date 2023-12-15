import prisma from "@/prisma";

export async function GET() {
  const res = await prisma.occupation.findMany();
  return Response.json(res);
}