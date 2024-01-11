import { NextResponse } from "next/server"
import prisma from "@/prisma"
import { Announcement } from "@prisma/client"


export async function POST(request: Request){
  
  const announcement: Announcement = await request.json()
  console.log(announcement)

  try{
      await prisma.announcement.create({
        data: {
          ...announcement
        }
  })
  console.log('asdasd')
  return NextResponse.json({success: `An annoucement has been posted. Reload the page to apply the changes.`})

  }catch(error){
    console.log(error)
    return NextResponse.json({error: `An error occured while posting an annoucement`})
  }
}

export async function GET(){
  try{
      const announcements = await prisma.announcement.findMany({
        orderBy: {
          createdAt: {
            sort: "desc"
          }
        }
  })
  return NextResponse.json(announcements)

  }catch(error){
    console.log(error)
    return NextResponse.json({error: `An error occured while fetching announcements`})
  }
}

export async function DELETE(request: Request){
  const annoucement: {id: number} = await request.json()

  try{
      await prisma.announcement.delete({
    where: {
      id: annoucement.id
    }
  })
  return NextResponse.json({success: `Announcement has been deleted.`})

  }catch(error){
    return NextResponse.json({error: `An error occured while deleting announcement`})
  }

}