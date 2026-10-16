"use client";

import { useActionState } from "react";
import { sendContact, type ContactField, type ContactState } from "@/app/[lang]/contato/actions";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full border border-line bg-ink px-3 py-2 text-text outline-none transition-colors focus:border-amber aria-[invalid=true]:border-red";

type Props = { lang: Locale; t: Dictionary["contact"]["form"] };

export default function ContactForm({ lang, t }: Props) {
  const [state, formAction, pending] = useActionState(sendContact.bind(null, lang), initialState);

  const fields: { name: ContactField; label: string; type: string; autoComplete: string }[] = [
    { name: "name", label: t.name, type: "text", autoComplete: "name" },
    { name: "email", label: t.email, type: "email", autoComplete: "email" },
  ];

  return (
    <form action={formAction} noValidate className="space-y-5">
      {fields.map((f) => (
        <div key={f.name} className="space-y-1">
          <label htmlFor={f.name} className="block text-sm text-amber">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            defaultValue={state.values?.[f.name]}
            aria-invalid={state.errors?.[f.name] ? true : undefined}
            aria-describedby={state.errors?.[f.name] ? `${f.name}-erro` : undefined}
            className={inputClass}
          />
          {state.errors?.[f.name] && (
            <p id={`${f.name}-erro`} className="text-sm text-red">
              {state.errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm text-amber">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? "message-erro" : undefined}
          className={`${inputClass} resize-y`}
        />
        {state.errors?.message && (
          <p id="message-erro" className="text-sm text-red">
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Armadilha para robôs: escondida de pessoas e leitores de tela */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="border border-amber px-4 py-2 text-amber transition-colors hover:bg-amber hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? t.sending : t.submit}
        </button>
        <p
          role="status"
          className={state.status === "error" ? "text-sm text-red" : "text-sm text-cyan"}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
