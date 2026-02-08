import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const COOKIE_NAME = "ol_session";
const SESSION_DAYS = 14;

function sessionExpiryDate() {
  const d = new Date();
  d.setDate(d.getDate() + SESSION_DAYS);
  return d;
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = sessionExpiryDate();

  await db.session.create({
    data: {
      token,
      userId,
      expiresAt
    }
  });

  return { token, expiresAt };
}

export function setSessionCookie(token: string, expiresAt: Date) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/"
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/"
  });
}

export async function getSessionUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session) return null;
  if (session.expiresAt.getTime() <= Date.now()) {
    await db.session.delete({ where: { token } }).catch(() => null);
    return null;
  }

  if (!session.user.active) return null;
  return session.user;
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/admin");
  return user;
}

