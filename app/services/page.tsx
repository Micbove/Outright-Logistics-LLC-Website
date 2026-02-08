import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata = {
  title: "Services"
};

export default function ServicesPage() {
  return (
    <PublicShell>
      <section className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Services
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
              Practical logistics and supply chain support for day-to-day
              execution. We focus on process, cost visibility, vendor follow-up,
              and documentation that your team can run.
            </p>
          </div>
          <Link className="btn-primary" href="/contact">
            Request information
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Logistics & supply chain process reviews
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Map the current workflow and identify where time, money, and
              accountability leak: receiving, shipping, carrier handoffs, and
              billing.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Vendor & carrier coordination
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Establish ownership, escalation rules, and performance tracking.
              Reduce surprises and stop repeat problems.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Cost visibility and spend tracking
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Build a simple spend view that reconciles. Improve coding,
              approvals, and backup documentation for invoices and receipts.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Operational cleanup and documentation
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Standard operating procedures, vendor lists, lane notes,
              handoff checklists, and clean storage of core documents.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Post-acquisition operational support
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Stabilize execution quickly: align vendors, normalize billing,
              standardize SOPs, and establish reporting that leadership can use.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Execution support during transitions or growth
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Extra operational capacity for busy periods—without building a
              fragile system. Keep it simple and maintainable.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

