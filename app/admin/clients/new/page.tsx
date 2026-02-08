import Link from "next/link";
import { createClientAction } from "../actions";

export const metadata = {
  title: "New client"
};

export default async function NewClientPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const error = typeof searchParams?.error === "string" ? searchParams.error : null;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            New client
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Create an internal record you can maintain.
          </p>
        </div>
        <Link className="btn-secondary" href="/admin/clients">
          Back
        </Link>
      </div>

      <form action={createClientAction} className="card space-y-4 p-6">
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
            <input className="input" id="name" name="name" required />
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="status">
              Status
            </label>
            <select className="input" id="status" name="status" defaultValue="LEAD">
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
            <input className="input" id="contactName" name="contactName" />
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="contactEmail">
              Contact email
            </label>
            <input className="input" id="contactEmail" name="contactEmail" type="email" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="label" htmlFor="contactPhone">
              Contact phone
            </label>
            <input className="input" id="contactPhone" name="contactPhone" />
          </div>
          <div className="space-y-1">
            <label className="label" htmlFor="revenueCents">
              Revenue (cents, optional)
            </label>
            <input className="input" id="revenueCents" name="revenueCents" inputMode="numeric" />
            <p className="hint">Store in cents to avoid rounding issues.</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="label" htmlFor="notes">
            Notes
          </label>
          <textarea className="input min-h-32" id="notes" name="notes" />
        </div>

        <button className="btn-primary" type="submit">
          Create client
        </button>
      </form>
    </div>
  );
}

