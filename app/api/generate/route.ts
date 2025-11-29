import { NextRequest, NextResponse } from "next/server";
import {
  CreativeInput,
  generateCreative,
  generateEbook,
  generateVisualStory
} from "@/lib/generator";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      type: "creative" | "visual" | "ebook";
      input: CreativeInput;
    };
    if (!body?.type || !body?.input) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    switch (body.type) {
      case "creative": {
        const data = generateCreative(body.input);
        return NextResponse.json({ ok: true, data });
      }
      case "visual": {
        const data = generateVisualStory(body.input);
        return NextResponse.json({ ok: true, data });
      }
      case "ebook": {
        const data = generateEbook(body.input);
        return NextResponse.json({ ok: true, data });
      }
      default:
        return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}

