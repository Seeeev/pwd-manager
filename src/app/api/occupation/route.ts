import prisma from "@/prisma";

export async function GET() {
  console.log('occupation called');
  const res = await prisma.occupation.findMany({
    orderBy: {
      id: "desc"
    }
  });

  return Response.json(res);
}