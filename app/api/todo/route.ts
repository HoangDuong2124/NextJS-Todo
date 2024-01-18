import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET() {
  const res = await prisma.todo.findMany({

    orderBy: {
      id: "asc"
    }
  })
  return Response.json(res)
}
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const add = await prisma.todo.create({
      data: {
        name: body.name,
        idTask: body.idTask,
        dueDate: body.dueDate,
        status: body.status,
      },
    })
    return NextResponse.json(add)
  } catch {
    return NextResponse.json({ message: "failed" }, {
      status: 400
    })
  }
}