"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createSession, setSessionCookie } from "@/lib/session";

const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

export async function loginAction(formData: FormData) {
  const raw = {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? "")
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) redirect("/login?error=invalid");

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !user.active) redirect("/login?error=invalid");

  const ok = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!ok) redirect("/login?error=invalid");

  const { token, expiresAt } = await createSession(user.id);
  setSessionCookie(token, expiresAt);

  if (user.mustChangePassword) redirect("/force-password-change");
  redirect("/admin");
}

