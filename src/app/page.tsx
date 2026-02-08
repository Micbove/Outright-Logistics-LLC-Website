import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";

export default function HomePage() {
  return (
    <PublicShell>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-12">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="text-sm font-semibold tracking-wide text-brand-orange">
                OUTRIGHT LOGISTICS
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Logistics and supply chain support built for execution.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                We help small and mid-sized businesses stabilize operations,
                tighten vendor and carrier accountability, and build cost
                visibility that holds up under audit and lender review.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn-primary" href="/contact">
                  Request information
                </Link>
                <Link className="btn-secondary" href="/services">
                  View services
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-slate-900">
                  What you get
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>
                    <span className="font-medium text-slate-900">
                      Clear processes:
                    </span>{" "}
                    documented workflows your team can run.
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">
                      Cost control:
                    </span>{" "}
                    spend tracking, chargeback support, clean data.
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">
                      Vendor follow-through:
                    </span>{" "}
                    measurable accountability.
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">
                      Operational cleanup:
                    </span>{" "}
                    fix the messy middle, not just talk about it.
                  </li>
                </ul>
              </div>
              <p className="mt-3 text-xs text-slate-600">
                No decks. No fluff. Work that shows up in your day-to-day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-lg font-semibold text-slate-900">Who it’s for</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Owner-operators, controllers, and operations leads who need stable
              shipping, clean documentation, and costs they can explain.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Growth phase
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Volume increases, new lanes, new carriers, more invoices—your
                  process needs to keep up.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Post-acquisition
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Standardize vendors, clean up data, align billing and SOPs,
                  and get control back fast.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Cost visibility gaps
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  You know spend is leaking, but you can’t trace why. We build
                  a trackable system.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Vendor performance issues
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Late pickups, invoice errors, unclear ownership—establish
                  rules, escalations, and metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

