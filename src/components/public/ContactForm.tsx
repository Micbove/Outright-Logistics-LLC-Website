"use client";

import { useMemo, useState } from "react";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const disabled = useMemo(() => state.status === "submitting", [state.status]);

  async function onSubmit(formData: FormData) {
    setState({ status: "submitting" });
    try {
      const payload = {
        name: String(formData.get("name") ?? "").trim(),
        company: String(formData.get("company") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim()
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; message: string }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok !== true) {
        setState({
          status: "error",
          message: data && "error" in data ? data.error : "Submission failed."
        });
        return;
      }

      setState({ status: "success", message: data.message });
    } catch {
      setState({ status: "error", message: "Submission failed." });
    }
  }

  return (
    <form action={onSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            id="name"
            name="name"
            autoComplete="name"
            required
            disabled={disabled}
          />
        </div>
        <div className="space-y-1">
          <label className="label" htmlFor="company">
            Company
          </label>
          <input
            className="input"
            id="company"
            name="company"
            autoComplete="organization"
            required
            disabled={disabled}
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={disabled}
        />
      </div>
      <div className="space-y-1">
        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea
          className="input min-h-32"
          id="message"
          name="message"
          required
          disabled={disabled}
        />
        <p className="hint">
          Include volume, lanes, vendors/carriers involved, and what “good” looks
          like.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button className="btn-primary" type="submit" disabled={disabled}>
          {state.status === "submitting" ? "Sending..." : "Send"}
        </button>
        {state.status === "success" ? (
          <p className="text-sm font-medium text-green-700">{state.message}</p>
        ) : null}
        {state.status === "error" ? (
          <p className="text-sm font-medium text-red-700">{state.message}</p>
        ) : null}
      </div>
    </form>
  );
}

