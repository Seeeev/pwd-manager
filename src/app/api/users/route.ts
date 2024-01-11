import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        barangay: true
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({
      error: `An error occured while fetching users`,
    });
  }
}

export async function POST(request: Request) {


    const data = await request.json()
    console.log(data)
    
    const exist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(!exist){
        // hash the password
        const salt = genSaltSync(10);
        const password = hashSync(data.password, salt);
        
        const res = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role,
          barangayId: parseInt(data.barangay),
          password: password
        }
    })
    return  NextResponse.json({success: 'User has been created, reload the page to apply changes.'});
    }
    
    else{
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
}

export async function PUT(request: Request) {


    const data = await request.json()
    try{
      await prisma.user.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name,
          email: data.email,
          barangayId: parseInt(data.barangay),
          role: data.role
        }
      })
      return NextResponse.json({success: 'User has been updated'})
    }catch(error){
      console.log(error)
      return NextResponse.json({error: 'An error occured'})
    }

    
    
    // const exist = await prisma.user.findUnique({
    //     where: {
    //         email: data.email
    //     }
    // })

    // if(!exist){
    //     // hash the password
    //     const salt = genSaltSync(10);
    //     const password = hashSync(data.password, salt);
        
    //     const res = await prisma.user.create({
    //     data: {
    //       email: data.email,
    //       name: data.name,
    //       role: data.role,
    //       barangayId: parseInt(data.barangay),
    //       password: password
    //     }
    // })
    // return  NextResponse.json({success: 'User has been created, reload the page to apply changes.'});
    // }
    
    // else{
    //     return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    // }
    
}