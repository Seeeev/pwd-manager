import prisma from "@/prisma"
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const data = await request.json()
    
    const exist = await prisma.user.findUnique({
        where: {
            email: data.data.email
        }
    })

    if(!exist){
        // hash the password
        const salt = genSaltSync(10);
        const password = hashSync(data.data.password, salt);
        
        const res = await prisma.user.create({
        data: {
            ...data.data, password: password
        }
    })
    return  NextResponse.json(res);
    }
    
    else{
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
}

