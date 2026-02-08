import { PublicShell } from "@/components/public/PublicShell";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="container-page py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          About OUTRIGHT LOGISTICS
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700">
          Outright Logistics LLC is an operations-first logistics and supply
          chain consulting firm. The work is practical: stabilize execution,
          document processes, tighten vendor accountability, and make costs
          traceable.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                How we work
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-medium text-slate-900">
                    Diagnose fast:
                  </span>{" "}
                  map what’s happening in receiving, shipping, billing, and
                  vendor handoffs.
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    Fix the blockers:
                  </span>{" "}
                  invoice errors, unclear ownership, missing SOPs, broken
                  approvals.
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    Build operating rhythm:
                  </span>{" "}
                  simple tracking, escalation rules, and documentation that your
                  team can maintain.
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    Leave it cleaner:
                  </span>{" "}
                  vendor lists, lane notes, receipts and contracts organized,
                  and costs that reconcile.
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Founder / operator background
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                OUTRIGHT LOGISTICS was founded by a hands-on operator with
                real-world experience in logistics execution, supply chain
                coordination, vendor and carrier management, procurement, and
                operational cleanup.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                The goal is simple: implement systems that work and hold up
                under pressure—busy weeks, staff changes, audits, and lender
                questions.
              </p>
            </div>
            <p className="mt-3 text-xs text-slate-600">
              We operate as an extension of the internal team. Clear ownership.
              Clear follow-through.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

