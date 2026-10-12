"use client";

import { useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { jetbrainsMono } from "@/utils/fonts";
import cn from "@/utils/cn";

type QueryType = "office_hours" | "doubt";
type Status = "idle" | "sending" | "sent" | "error";

const TOPICS = [
  "Courses & majors",
  "Programming / debugging",
  "Theory & math",
  "Projects & open source",
  "Internships & careers",
  "Research",
  "Something else",
];

const label = `${jetbrainsMono.className} block text-[11px] uppercase tracking-[0.18em] text-secondary mb-2`;
const field =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

export function QueryForm() {
  const [type, setType] = useState<QueryType>("office_hours");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/cs-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 md:p-10 text-center">
        <MdCheckCircleOutline className="text-5xl text-primary mx-auto mb-4" aria-hidden />
        <h2 className="text-2xl font-semibold text-on-surface mb-2">Got it.</h2>
        <p className="text-on-surface-variant mb-6">
          {type === "office_hours"
            ? "We'll email you to lock in a time."
            : "We'll get back to you over email soon."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className={`${jetbrainsMono.className} text-sm uppercase tracking-wide text-primary hover:underline`}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-surface border border-border rounded-xl p-6 md:p-8 flex flex-col gap-5">
      {/* Type toggle */}
      <div role="radiogroup" aria-label="What do you need?" className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-surface-container-low border border-border">
        {(
          [
            ["office_hours", "Book office hours"],
            ["doubt", "Send a doubt"],
          ] as const
        ).map(([value, text]) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={type === value}
            onClick={() => setType(value)}
            className={cn(
              `${jetbrainsMono.className} text-xs sm:text-sm uppercase tracking-wide py-2.5 rounded-md transition-colors`,
              type === value ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-primary"
            )}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="q-name" className={label}>Name</label>
          <input id="q-name" name="name" required maxLength={100} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="q-email" className={label}>Email</label>
          <input
            id="q-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@ashoka.edu.in"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="q-topic" className={label}>Topic</label>
        <select id="q-topic" name="topic" required defaultValue="" className={field}>
          <option value="" disabled>Pick one</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {type === "office_hours" && (
        <div>
          <label htmlFor="q-slots" className={label}>When are you free?</label>
          <input
            id="q-slots"
            name="slots"
            required
            maxLength={300}
            placeholder="e.g. Tue/Thu after 4pm, Fri morning"
            className={field}
          />
        </div>
      )}

      <div>
        <label htmlFor="q-message" className={label}>
          {type === "office_hours" ? "What do you want to go over?" : "Your doubt"}
        </label>
        <textarea
          id="q-message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder={
            type === "office_hours"
              ? "A line or two so we can bring the right person."
              : "Be as specific as you can. Paste error messages or code if it helps."
          }
          className={cn(field, "resize-y")}
        />
      </div>

      {/* Honeypot for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {status === "error" && (
        <p role="alert" className="text-sm text-primary">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`${jetbrainsMono.className} self-start bg-primary text-on-primary px-6 py-3 text-sm uppercase tracking-wide rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:hover:scale-100`}
      >
        {status === "sending" ? "Sending…" : type === "office_hours" ? "Request a slot" : "Send doubt"}
      </button>
    </form>
  );
}
