import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { updateClientAction } from "../actions";

export const metadata = {
  title: "Client"
};

export default async function ClientDetailPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  await requireUser();
  const { id } = params;
  const error = typeof searchParams?.error === "string" ? searchParams.error : null;

  const client = await db.client.findUnique({
    where: { id },
    include: {
      documents: { orderBy: [{ createdAt: "desc" }], take: 10 }
    }
  });
  if (!client) notFound();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            {client.name}
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Status: <span className="font-medium text-slate-900">{client.status}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="btn-secondary" href="/admin/clients">
            Back
          </Link>
          <Link className="btn-primary" href={`/admin/documents/new?clientId=${client.id}`}>
            Add document
          </Link>
        </div>
      </div>

      <form action={updateClientAction.bind(null, client.id)} className="card space-y-4 p-6">
        {error ? (
          <p className="text-sm font-medium text-red-700">
            Invalid data. Check fields and try again.
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="label" htmlFor="name">
              Client name
            </label>
            <input className="input" id="name" name="name" defaultValue={client.name} required />
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="status">
              Status
            </label>
            <select className="input" id="status" name="status" defaultValue={client.status}>
              <option value="LEAD">LEAD</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="label" htmlFor="contactName">
              Contact name
            </label>
            <input className="input" id="contactName" name="contactName" defaultValue={client.contactName ?? ""} />
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="contactEmail">
              Contact email
            </label>
            <input className="input" id="contactEmail" name="contactEmail" type="email" defaultValue={client.contactEmail ?? ""} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="label" htmlFor="contactPhone">
              Contact phone
            </label>
            <input className="input" id="contactPhone" name="contactPhone" defaultValue={client.contactPhone ?? ""} />
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="revenueCents">
              Revenue (cents, optional)
            </label>
            <input className="input" id="revenueCents" name="revenueCents" inputMode="numeric" defaultValue={client.revenueCents ?? ""} />
          </div>
        </div>

        <div className="space-y-1">
          <label className="label" htmlFor="notes">
            Notes
          </label>
          <textarea className="input min-h-32" id="notes" name="notes" defaultValue={client.notes ?? ""} />
        </div>

        <button className="btn-primary" type="submit">
          Save changes
        </button>
      </form>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Recent documents</h2>
          <Link className="text-sm font-medium text-brand-blue hover:underline" href="/admin/documents">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Key</th>
                <th className="py-2 pr-4">Version</th>
                <th className="py-2 pr-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {client.documents.length === 0 ? (
                <tr>
                  <td className="py-3 text-slate-600" colSpan={4}>
                    No documents recorded yet.
                  </td>
                </tr>
              ) : (
                client.documents.map((d) => (
                  <tr key={d.id} className="border-t border-slate-100">
                    <td className="py-3 pr-4">{d.category}</td>
                    <td className="py-3 pr-4">{d.documentKey}</td>
                    <td className="py-3 pr-4">{d.version}</td>
                    <td className="py-3 pr-4 text-xs text-slate-600">
                      {d.createdAt.toISOString().slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

