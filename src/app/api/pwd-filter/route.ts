import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(request: Request) {
    console.log('GET called')
  const { searchParams } = new URL(request.url);

  const role = searchParams.get("role");
  const barangayId = searchParams.get("barangayId");
  const action = searchParams.get("action");

  if (role == "admin" && action == "apparent") {
    const data = await prisma.pwd.findMany({
      where: {
        isApparent: true,
      },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log("apparent called");
    return NextResponse.json(data);
  }

  if (role == "admin" && action == "nonApparent") {
    const data = await prisma?.pwd.findMany({
      where: {
        isApparent: false,
      },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log("non-apparent called");
    return NextResponse.json(data);
  }

  if (role == "barangay" && barangayId && action == "approved") {
    const data = await prisma?.pwd.findMany({
      where: {
        barangayId: parseInt(barangayId),
        status: "approved",
      },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log("approve called : barangay");
    return NextResponse.json(data);
  }

  if (role == "admin" && action == "approved") {
    const data = await prisma?.pwd.findMany({
      where: {
        status: "approved",
      },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log("approve called : admin");
    return NextResponse.json(data);
  }

  if (role == "barangay" && barangayId && action == "default") {
    const data = await prisma?.pwd.findMany({
      where: {
        barangayId: parseInt(barangayId),
      },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log('default called : barangay')
    return NextResponse.json(data);
  }
  if (role == "admin" && action == "default") {
    const data = await prisma?.pwd.findMany({
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log('default called: admin')
    return NextResponse.json(data);
  }

  if(role == 'admin' && action == 'pending'){
    const data = await prisma?.pwd.findMany({
        where: {
            status: 'pending'
        },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log('default called: admin')
    return NextResponse.json(data);
  }

    if(role == 'barangay' && barangayId && action == 'pending'){
    const data = await prisma?.pwd.findMany({
        where: {
            status: 'pending',
            barangayId: parseInt(barangayId),
        },
      include: {
        barangay: true,
        disability: true,
        disabilityCause: true,
        occupation: true,
      },
      orderBy: {
        lastName: "asc",
      },
    });
    console.log('default called: admin')
    return NextResponse.json(data);
  }
}
