import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // @ts-ignore
    const userId = parseInt(session.user.id);

    const todos = await prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
        return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    // @ts-ignore
    const userId = parseInt(session.user.id);

    const todo = await prisma.todo.create({
        data: {
            title,
            userId,
        },
    });

    return NextResponse.json(todo, { status: 201 });
}
