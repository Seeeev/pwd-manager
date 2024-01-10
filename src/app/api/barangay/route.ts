import prisma from "@/prisma";
import { Epilogue } from "next/font/google";
import { NextResponse } from "next/server";
import { sessionType } from "../../../../types/session-type";
import { Barangay } from "@prisma/client";

export async function GET() {
  const res = await prisma.barangay.findMany();

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

// export async function POST(request: Request){
//   const data: sessionType = await request.json()

//   const barangay = data.data?.user.role == 'admin' && await prisma.barangay.findMany()
  
//   const specificBarangay = data.data?.user.role == 'barangay' && await prisma.barangay.findMany({
//     where: {
//       id: {
//         equals: data.data.user.barangayId!
//       }
//     }
//   })
  
//   if(barangay){
//     return NextResponse.json(barangay)
//   }
//   else{
//     return NextResponse.json(specificBarangay)
//   }
// }