import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { completed, title } = await req.json();

    // @ts-ignore
    const userId = parseInt(session.user.id);

    const todoId = parseInt(id);

    const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId },
    });

    if (!existingTodo || existingTodo.userId !== userId) {
        return NextResponse.json({ message: "Not found or unauthorized" }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
        where: { id: todoId },
        data: {
            completed: completed !== undefined ? completed : undefined,
            title: title !== undefined ? title : undefined,
        },
    });

    return NextResponse.json(updatedTodo);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // @ts-ignore
    const userId = parseInt(session.user.id);
    const todoId = parseInt(id);

    const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId },
    });

    if (!existingTodo || existingTodo.userId !== userId) {
        return NextResponse.json({ message: "Not found or unauthorized" }, { status: 404 });
    }

    await prisma.todo.delete({
        where: { id: todoId },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
}
