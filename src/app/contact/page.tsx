import { PublicShell } from "@/components/public/PublicShell";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <PublicShell>
      <section className="container-page py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Request information
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">
          Send a short note about what you’re dealing with. We’ll respond with
          next steps and what information we need to scope the work.
        </p>
        <div className="mt-8 max-w-2xl">
          <ContactForm />
          <p className="mt-3 text-xs text-slate-600">
            Submissions are stored internally. No mailing lists.
          </p>
        </div>
      </section>
    </PublicShell>
  );
}

