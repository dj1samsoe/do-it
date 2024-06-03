import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { User, getServerSession } from "next-auth";

const prisma = new PrismaClient();
export const revalidate = 30;

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session && session?.user?.email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email }, // Assuming the user's email is stored in the session
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const tasks = await prisma.task.findMany({
        where: { userId: user.id },
      });
      return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json(
        { error: "Error fetching tasks" },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = JSON.parse(await req.text());

  try {
    const task = await prisma.task.create({
      data: {
        ...formData,
        user: { connect: { email: session?.user?.email as User["email"] } },
      },
    });
    return new NextResponse(JSON.stringify(task), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse(JSON.stringify({ error: "Error creating task" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("id");

  if (!taskId) {
    return NextResponse.json(
      { error: "Task ID not provided" },
      { status: 400 }
    );
  }

  if (taskId) {
    try {
      const task = await prisma.task.update({
        where: { id: String(taskId) },
        data: await req.json(),
      });
      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      console.error("Error updating task:", error);
      return NextResponse.json(
        { error: "Error updating task" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("id");

  if (!taskId) {
    return NextResponse.json({ error: "Task Not Found" }, { status: 400 });
  }

  if (taskId) {
    try {
      await prisma.task.delete({
        where: { id: String(taskId) },
      });

      return NextResponse.json(
        { message: "Task deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json(
        { error: "Error deleting task" },
        { status: 500 }
      );
    }
  }
}
