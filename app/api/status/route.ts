import prisma from "@/lib/prisma"
export async function GET() {
    const res = await  prisma.status.findMany()
    return Response.json(res)
  }
