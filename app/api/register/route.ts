import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const app_script_url: string = process.env.NEXT_PUBLIC_END_POINT!;

  try {
    const response = await fetch(app_script_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    console.log("result at server");
    console.log(result);
    return NextResponse.json({ ...result, statusCode: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error from the server",
      statusCode: 500,
    });
  }
}

export async function GET(req: Request) {
  return new NextResponse("Something is happening");
}
