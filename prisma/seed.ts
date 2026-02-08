import bcrypt from "bcryptjs";
import { db } from "../src/lib/db";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing required env var: ${name}`);
  return v.trim();
}

async function main() {
  const email = requiredEnv("ADMIN_EMAIL").toLowerCase();
  const tempPassword = requiredEnv("ADMIN_TEMP_PASSWORD");

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    // Do not overwrite existing credentials.
    console.log(`Seed: admin already exists (${email})`);
    return;
  }

  const passwordHash = await bcrypt.hash(tempPassword, 12);

  await db.user.create({
    data: {
      email,
      role: "ADMIN",
      passwordHash,
      active: true,
      mustChangePassword: true
    }
  });

  console.log(`Seed: created admin user (${email})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

