"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { requireAdmin } from "@/lib/session";

const CreateSchema = z.object({
  email: z.string().trim().email().max(200),
  name: z.string().trim().max(200).optional().or(z.literal("")),
  tempPassword: z.string().min(10).max(200)
});

export async function createEmployeeAction(formData: FormData) {
  await requireAdmin();

  const raw = {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    name: String(formData.get("name") ?? "").trim(),
    tempPassword: String(formData.get("tempPassword") ?? "")
  };

  const parsed = CreateSchema.safeParse(raw);
  if (!parsed.success) redirect("/admin/users?error=invalid");

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) redirect("/admin/users?error=exists");

  await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name || null,
      role: "EMPLOYEE",
      passwordHash: await hashPassword(parsed.data.tempPassword),
      active: true,
      mustChangePassword: true
    }
  });

  redirect("/admin/users?created=1");
}

export async function setUserActiveAction(userId: string, active: boolean) {
  await requireAdmin();

  await db.user.update({
    where: { id: userId },
    data: { active }
  });

  redirect("/admin/users");
}

