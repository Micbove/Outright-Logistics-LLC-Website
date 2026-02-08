"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { clearSessionCookie } from "@/lib/session";

export async function logoutAction() {
  const token = cookies().get("ol_session")?.value;
  if (token) {
    await db.session.delete({ where: { token } }).catch(() => null);
  }
  clearSessionCookie();
  redirect("/login");
}

