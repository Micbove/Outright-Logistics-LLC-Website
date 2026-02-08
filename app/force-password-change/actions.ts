"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { requireUser } from "@/lib/session";

const ChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(10).max(200)
});

export async function forceChangePasswordAction(formData: FormData) {
  const user = await requireUser();

  const raw = {
    currentPassword: String(formData.get("currentPassword") ?? ""),
    newPassword: String(formData.get("newPassword") ?? "")
  };

  const parsed = ChangeSchema.safeParse(raw);
  if (!parsed.success) redirect("/force-password-change?error=invalid");

  const fresh = await db.user.findUnique({ where: { id: user.id } });
  if (!fresh) redirect("/login");

  const ok = await verifyPassword(parsed.data.currentPassword, fresh.passwordHash);
  if (!ok) redirect("/force-password-change?error=invalid");

  await db.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(parsed.data.newPassword),
      mustChangePassword: false
    }
  });

  redirect("/admin");
}

