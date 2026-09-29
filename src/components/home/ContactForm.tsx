"use client";

import { useState } from "react";
import { contactSchema, projectTypes } from "@/lib/contact";
import { ArrowRight, Check } from "@/components/ui/icons";

type Status =
  { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

type FieldErrors = Partial<
  Record<"name" | "email" | "company" | "projectType" | "message", string>
>;

const field =
  "border-line-strong bg-surface text-fg placeholder:text-subtle focus-visible:border-accent w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-colors";

export function ContactForm({ email }: { email: string | null }) {
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      startedAt,
    };

    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      const flat = check.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0]])) as FieldErrors,
      );
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus({ kind: "sent" });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus({ kind: "error", message: body.error ?? "Something went wrong." });
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach the server." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        role="status"
        className="border-line bg-surface flex flex-col items-center gap-4 rounded-3xl border p-10 text-center"
      >
        <span className="bg-accent text-accent-ink flex size-12 items-center justify-center rounded-full">
          <Check className="size-6" />
        </span>
        <p className="text-xl font-semibold">Thanks, it&apos;s on its way.</p>
        <p className="text-muted">I&apos;ll reply to the email you gave within one business day.</p>
      </div>
    );
  }

  const describe = (name: keyof FieldErrors) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};
  const error = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={`${name}-error`} className="text-rec text-sm">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="border-line bg-surface/40 flex w-full flex-col gap-5 rounded-3xl border p-6 text-left md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            className={field}
            {...describe("name")}
          />
          {error("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={field}
            {...describe("email")}
          />
          {error("email")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company <span className="text-subtle font-normal">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={120}
            className={field}
            {...describe("company")}
          />
          {error("company")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="text-sm font-medium">
            What do you need?
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={projectTypes[0]}
            className={field}
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Tell me about it
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          placeholder="What you're building, who it's for, and roughly when you need it."
          className={`${field} resize-y`}
          {...describe("message")}
        />
        {error("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-subtle text-sm">
          Sent straight to my inbox. Nothing is stored on this site.
        </p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="bg-accent text-accent-ink flex h-12 items-center justify-center gap-2 rounded-full px-7 font-semibold transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div aria-live="polite">
        {status.kind === "error" ? (
          <p className="text-rec text-sm">
            {status.message}
            {email ? (
              <>
                {" "}
                You can also email{" "}
                <a href={`mailto:${email}`} className="link-u text-fg">
                  {email}
                </a>
                .
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    </form>
  );
}
