import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

export const metadata = {
  title: "Clients"
};

export default async function ClientsPage() {
  await requireUser();

  const clients = await db.client.findMany({
    orderBy: [{ updatedAt: "desc" }]
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Clients
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Internal records. Operational notes, not sales notes.
          </p>
        </div>
        <Link className="btn-primary" href="/admin/clients/new">
          New client
        </Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-600" colSpan={4}>
                  No clients yet.
                </td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <Link className="font-medium text-brand-blue hover:underline" href={`/admin/clients/${c.id}`}>
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded border border-slate-200 bg-white px-2 py-1 text-xs">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {c.contactName ? c.contactName : "—"}
                    {c.contactEmail ? (
                      <span className="block text-xs text-slate-600">{c.contactEmail}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {c.updatedAt.toISOString().slice(0, 10)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

