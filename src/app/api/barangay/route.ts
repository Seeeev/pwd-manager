import prisma from "@/prisma";
import { Epilogue } from "next/font/google";
import { NextResponse } from "next/server";
import { sessionType } from "../../../../types/session-type";
import { Barangay } from "@prisma/client";

export async function GET() {
  const res = await prisma.barangay.findMany({
    include: {
      pwd: true
    }
  });

  return Response.json(res)
}

export async function DELETE(request: Request){
  const barangay: Barangay = await request.json()

  try{
      await prisma.barangay.delete({
    where: {
      id: barangay.id
    }
  })
  return NextResponse.json({success: `${barangay.name} has been deleted.`})

  }catch(error){
    return NextResponse.json({error: `An error occured while deleting ${barangay.name}`})
  }

}

export async function PATCH(request: Request){
  const barangay: Barangay = await request.json()

  try{
      await prisma.barangay.update({
        data: {
          name: barangay.name
        },
        where: {
          id: barangay.id
        }
  })
  return NextResponse.json({success: `${barangay.name} has been edited.`})

  }catch(error){
    return NextResponse.json({error: `An error occured while editing ${barangay.name}`})
  }

}

export async function POST(request: Request){
  const name: {name: string} = await request.json()

  try{
      await prisma.barangay.create({
        data: {
          name: name.name
        }
  })
  return NextResponse.json({success: `Barangay ${name.name} has been added. Reload the page to apply the changes.`})

  }catch(error){
    return NextResponse.json({error: `An error occured while adding barangay ${name.name}`})
  }
}