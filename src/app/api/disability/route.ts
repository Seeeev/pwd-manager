import prisma from "@/prisma";

export async function GET() {
  const res = await prisma.disability.findMany();

  return Response.json(res)
}