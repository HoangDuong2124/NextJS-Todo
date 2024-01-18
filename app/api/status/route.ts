import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET() {
    const res = await  prisma.status.findMany()
    return Response.json(res)
  }
 