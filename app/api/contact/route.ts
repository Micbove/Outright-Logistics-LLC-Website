import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(4000)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission." },
        { status: 400 }
      );
    }

    await db.contactSubmission.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company,
        email: parsed.data.email,
        message: parsed.data.message
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Received. We’ll follow up shortly."
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Submission failed." },
      { status: 500 }
    );
  }
}

