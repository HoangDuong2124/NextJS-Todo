import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(req: Request, { params }: {
    params: { id: string }
}
) {
    try {


        console.log(params)
        const getByID = await prisma.todo.findUnique({
            where: {
                id: +params.id
            },
        })
        return NextResponse.json(getByID)
    } catch (e) {
        console.log(e)

        return NextResponse.json({ message: "failed" }, {
            status: 400
        })
    }
}
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
                isCheck: body.isCheck
            }
        })
        return NextResponse.json(update)
    } catch {


        return NextResponse.json({ message: "failed" }, {
            status: 400
        })
    }
}
export async function DELETE(req: Request) {
    try {
        const body = await req.json()
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: body
            },
        })
        return NextResponse.json(deleteTodo)
    }
    catch (e) {

        console.log(e)

        return NextResponse.json({ message: "failed" }, {
            status: 400
        })
    }
}