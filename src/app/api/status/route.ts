import { Status } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PUT(request: Request){
    

    try{
        const req: {pwdNumber: string, status: Status} = await request.json()

    await prisma?.pwd.update({
        data: {
            status: req.status
        },
        where: {
            pwdNumber: req.pwdNumber
        }
    })
    return  NextResponse.json({succes: 'Status updated'})
    }
    catch(error){
    
        return NextResponse.json({error: error})
    }

}