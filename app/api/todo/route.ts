import prisma from "@/lib/prisma"
export async function GET() {
    const res = await  prisma.todo.findMany()
    return Response.json(res)
  }
