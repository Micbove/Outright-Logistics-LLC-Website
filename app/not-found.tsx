import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          The page you requested does not exist.
        </p>
        <div className="mt-6">
          <Link className="btn-primary" href="/">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

