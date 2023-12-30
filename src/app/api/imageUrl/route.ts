import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { edgeStoreRouter } from "../edgestore/[...edgestore]/route";
import { initEdgeStoreClient } from "@edgestore/server/core";

export async function POST(request: Request){

     const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

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
        return NextResponse.json({ error: 'User does not exists. Unable to upload requirements.' }, { status: 400 })
        
    }
}