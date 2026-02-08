import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { createDocumentAction } from "../actions";

export const metadata = {
  title: "New document"
};

export default async function NewDocumentPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  await requireUser();
  const error = typeof searchParams?.error === "string" ? searchParams.error : null;
  const prefillClientId =
    typeof searchParams?.clientId === "string" ? searchParams.clientId : "";

  const clients = await db.client.findMany({
    orderBy: [{ name: "asc" }],
    select: { id: true, name: true }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            New document
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Create a metadata record. File storage can be added later.
          </p>
        </div>
        <Link className="btn-secondary" href="/admin/documents">
          Back
        </Link>
      </div>

      <form action={createDocumentAction} className="card space-y-4 p-6">
        {error ? (
          <p className="text-sm font-medium text-red-700">
            Invalid data. Check fields and try again.
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="label" htmlFor="clientId">
              Client (optional)
            </label>
            <select className="input" id="clientId" name="clientId" defaultValue={prefillClientId}>
              <option value="">—</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select className="input" id="category" name="category" defaultValue="OTHER">
              <option value="CONTRACT">CONTRACT</option>
              <option value="RECEIPT">RECEIPT</option>
              <option value="INVOICE">INVOICE</option>
              <option value="NOTE">NOTE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="label" htmlFor="documentKey">
              Document key
            </label>
            <input className="input" id="documentKey" name="documentKey" required />
            <p className="hint">
              Used for versioning. Example: <span className="font-mono">msa-2026</span>,{" "}
              <span className="font-mono">invoice-2026-02</span>.
            </p>
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="title">
              Title (optional)
            </label>
            <input className="input" id="title" name="title" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="label" htmlFor="notes">
            Notes (optional)
          </label>
          <textarea className="input min-h-28" id="notes" name="notes" />
        </div>

        <button className="btn-primary" type="submit">
          Create document record
        </button>
      </form>
    </div>
  );
}

