import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const update = await prisma.todo.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                dueDate: body.dueDate,
                status: body.status,            
            }
        })
        return NextResponse.json(update)
    } catch {


        return NextResponse.json({ message: "failed" }, {
            status: 400
        })
    }
}