"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

const DocumentSchema = z.object({
  clientId: z.string().trim().optional().or(z.literal("")),
  category: z.enum(["CONTRACT", "RECEIPT", "INVOICE", "NOTE", "OTHER"]),
  documentKey: z.string().trim().min(1).max(200),
  title: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal(""))
});

export async function createDocumentAction(formData: FormData) {
  const user = await requireUser();

  const raw = {
    clientId: String(formData.get("clientId") ?? ""),
    category: String(formData.get("category") ?? "OTHER"),
    documentKey: String(formData.get("documentKey") ?? ""),
    title: String(formData.get("title") ?? ""),
    notes: String(formData.get("notes") ?? "")
  };

  const parsed = DocumentSchema.safeParse(raw);
  if (!parsed.success) redirect("/admin/documents/new?error=invalid");

  const clientId = parsed.data.clientId || null;
  if (clientId) {
    const exists = await db.client.findUnique({ where: { id: clientId } });
    if (!exists) redirect("/admin/documents/new?error=invalid");
  }

  // Auto-increment version for a given (clientId, documentKey).
  const latest = await db.document.findFirst({
    where: { clientId, documentKey: parsed.data.documentKey },
    orderBy: { version: "desc" }
  });
  const nextVersion = latest ? latest.version + 1 : 1;

  const doc = await db.document.create({
    data: {
      clientId,
      category: parsed.data.category,
      documentKey: parsed.data.documentKey,
      version: nextVersion,
      title: parsed.data.title || null,
      notes: parsed.data.notes || null,
      uploadedById: user.id
    }
  });

  if (clientId) redirect(`/admin/clients/${clientId}`);
  redirect(`/admin/documents?created=${doc.id}`);
}

