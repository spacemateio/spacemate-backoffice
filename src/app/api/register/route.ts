import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password } = await request.json();

  try {
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
