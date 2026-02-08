import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

export const metadata = {
  title: "Documents"
};

export default async function DocumentsPage() {
  await requireUser();

  const docs = await db.document.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 100,
    include: { client: true, uploadedBy: true }
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Documents
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Metadata records. Version history is tracked by document key.
          </p>
        </div>
        <Link className="btn-primary" href="/admin/documents/new">
          New document
        </Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Uploaded by</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {docs.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-600" colSpan={6}>
                  No documents yet.
                </td>
              </tr>
            ) : (
              docs.map((d) => (
                <tr key={d.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{d.category}</td>
                  <td className="px-4 py-3">{d.documentKey}</td>
                  <td className="px-4 py-3">{d.version}</td>
                  <td className="px-4 py-3">
                    {d.client ? (
                      <Link className="font-medium text-brand-blue hover:underline" href={`/admin/clients/${d.client.id}`}>
                        {d.client.name}
                      </Link>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {d.uploadedBy?.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {d.createdAt.toISOString().slice(0, 10)}
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

