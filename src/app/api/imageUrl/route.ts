import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { backendClient } from "@/lib/edgestore";


export async function POST(request: Request){

  const data: { pwdNumber: string; url: string } = await request.json()
  
    const isPwdExists = await prisma.pwd.findUnique({
        where: {
            pwdNumber: data.pwdNumber
        }
    })
    if(isPwdExists){
        const res = await prisma.imageUrls.create({
        data: {
            Pwd: {
                connect: {
                    pwdNumber: data.pwdNumber 
                }
            },
            url: data.url 
        },
    })
        return NextResponse.json(res);
    }
    else{
        const res = await backendClient.publicFiles.deleteFile({
        url: data.url,
    });
        return NextResponse.json({ error: 'User does not exists. Unable to upload documents.' }, { status: 400 })
        
    }
}