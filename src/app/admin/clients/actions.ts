"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

const ClientSchema = z.object({
  name: z.string().trim().min(1).max(200),
  contactName: z.string().trim().max(200).optional().or(z.literal("")),
  contactEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
  contactPhone: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  status: z.enum(["LEAD", "ACTIVE", "COMPLETED"]),
  revenueCents: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? Number(v) : null))
    .refine((v) => v === null || (Number.isFinite(v) && v >= 0), "Invalid revenue")
});

export async function createClientAction(formData: FormData) {
  await requireUser();

  const raw = {
    name: String(formData.get("name") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    contactEmail: String(formData.get("contactEmail") ?? ""),
    contactPhone: String(formData.get("contactPhone") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    status: String(formData.get("status") ?? "LEAD"),
    revenueCents: String(formData.get("revenueCents") ?? "")
  };

  const parsed = ClientSchema.safeParse(raw);
  if (!parsed.success) redirect("/admin/clients/new?error=invalid");

  const created = await db.client.create({
    data: {
      name: parsed.data.name,
      contactName: parsed.data.contactName || null,
      contactEmail: parsed.data.contactEmail || null,
      contactPhone: parsed.data.contactPhone || null,
      notes: parsed.data.notes || null,
      status: parsed.data.status,
      revenueCents: parsed.data.revenueCents
    }
  });

  redirect(`/admin/clients/${created.id}`);
}

export async function updateClientAction(clientId: string, formData: FormData) {
  await requireUser();

  const raw = {
    name: String(formData.get("name") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    contactEmail: String(formData.get("contactEmail") ?? ""),
    contactPhone: String(formData.get("contactPhone") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    status: String(formData.get("status") ?? "LEAD"),
    revenueCents: String(formData.get("revenueCents") ?? "")
  };

  const parsed = ClientSchema.safeParse(raw);
  if (!parsed.success) redirect(`/admin/clients/${clientId}?error=invalid`);

  await db.client.update({
    where: { id: clientId },
    data: {
      name: parsed.data.name,
      contactName: parsed.data.contactName || null,
      contactEmail: parsed.data.contactEmail || null,
      contactPhone: parsed.data.contactPhone || null,
      notes: parsed.data.notes || null,
      status: parsed.data.status,
      revenueCents: parsed.data.revenueCents
    }
  });

  redirect(`/admin/clients/${clientId}`);
}

