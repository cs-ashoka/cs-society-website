"use client";

import { useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import cn from "@/utils/cn";
import { WEB3FORMS_KEY } from "@/lib/web3forms";
import { fieldClass, labelClass, submitClass, textButtonClass } from "@/lib/form-styles";

type Status = "idle" | "sending" | "sent" | "error";

const SUPPORT = [
  "Collaborators",
  "Feedback",
  "Mentorship",
  "Resources",
  "Just want to showcase it",
  "Something else",
];

export function PitchForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Project pitch] ${data.title}`,
          from_name: "Project pitch",
          replyto: data.email,
          Name: data.name,
          Email: data.email,
          Project: data.title,
          Link: data.link || "—",
          "Looking for": data.support,
          Pitch: data.pitch,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error("Couldn't send right now. Try again, or email cs.society@ashoka.edu.in.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-4 text-center">
        <MdCheckCircleOutline className="text-5xl text-primary mx-auto mb-4" aria-hidden />
        <h3 className="text-xl font-semibold text-on-surface mb-2">Pitch received.</h3>
        <p className="text-on-surface-variant mb-6">We&apos;ll read it and get back to you over email.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={textButtonClass}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pitch-name" className={labelClass}>Name</label>
          <input id="pitch-name" name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="pitch-email" className={labelClass}>Email</label>
          <input
            id="pitch-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@ashoka.edu.in"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pitch-title" className={labelClass}>Project title</label>
          <input
            id="pitch-title"
            name="title"
            required
            maxLength={120}
            placeholder="e.g. Course Review Wiki"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="pitch-link" className={labelClass}>Link (optional)</label>
          <input
            id="pitch-link"
            name="link"
            type="url"
            maxLength={300}
            placeholder="Repo, deck or demo"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="pitch-support" className={labelClass}>What are you looking for?</label>
        <select id="pitch-support" name="support" required defaultValue="" className={fieldClass}>
          <option value="" disabled>Pick one</option>
          {SUPPORT.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="pitch-pitch" className={labelClass}>Tell us about it</label>
        <textarea
          id="pitch-pitch"
          name="pitch"
          required
          rows={5}
          maxLength={4000}
          placeholder="What are you building, where is it at, and what would help most?"
          className={cn(fieldClass, "resize-y")}
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
        className={submitClass}
      >
        {status === "sending" ? "Sending…" : "Send pitch"}
      </button>
    </form>
  );
}
