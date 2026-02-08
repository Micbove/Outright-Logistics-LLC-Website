import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const PageViewSchema = z.object({
  path: z.string().trim().min(1).max(2048),
  referrer: z.string().trim().max(2048).nullable().optional()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = PageViewSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ua = req.headers.get("user-agent");

    // IP is typically not reliably available in serverless contexts.
    // Keep this metadata-only and lightweight.
    await db.pageView.create({
      data: {
        path: parsed.data.path,
        referrer: parsed.data.referrer ?? null,
        userAgent: ua
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

