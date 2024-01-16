import { NextResponse } from "next/server"
import prisma from "@/prisma";
export async function POST(request:Request) {

    try{
        const pwdNumber = await request.json()

        const data = await prisma?.pwd.findUnique({
            where: {
                pwdNumber: pwdNumber
            },
            select: {
                imageUrls: true
            }
        })

       
        return NextResponse.json(data);
    }
    catch(error){
        return NextResponse.json(error);
    }   
}

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const pwdNumber = searchParams.get('id')

        try{

        const data = await prisma.pwd.findUnique({
            where: {
                pwdNumber: pwdNumber!.toString()
            },
            select: {
                imageUrls: true
            }
        })

       
        return NextResponse.json(data);
    }
    catch(error){
        return NextResponse.json(error);
    }  
}