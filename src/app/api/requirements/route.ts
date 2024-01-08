import { NextResponse } from "next/server"

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