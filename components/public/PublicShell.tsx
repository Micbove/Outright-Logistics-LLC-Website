import Link from "next/link";
import { AnalyticsTracker } from "@/components/shared/AnalyticsTracker";
import { Suspense } from "react";

function PublicNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-wide text-brand-blue">
            OUTRIGHT
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-900">
            LOGISTICS
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-slate-700 hover:text-slate-900" href="/about">
            About
          </Link>
          <Link className="text-slate-700 hover:text-slate-900" href="/services">
            Services
          </Link>
          <Link className="btn-accent" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page py-8">
        <div className="flex flex-col gap-2 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
          <p className="font-medium text-slate-900">OUTRIGHT LOGISTICS LLC</p>
          <p className="text-xs text-slate-600">
            Operations-first logistics and supply chain support.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
          <Link className="hover:text-slate-900" href="/login">
            Internal login
          </Link>
          <span>© {new Date().getFullYear()} OUTRIGHT LOGISTICS LLC</span>
        </div>
      </div>
    </footer>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      <PublicNav />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}

