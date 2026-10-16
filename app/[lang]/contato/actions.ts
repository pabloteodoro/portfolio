"use server";

import { getDictionary } from "@/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  lang: string,
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // O idioma vem do cliente: só aceita valores conhecidos
  const t = getDictionary(hasLocale(lang) ? lang : defaultLocale).contact.result;

  // Campo invisível: só robôs preenchem
  if (formData.get("website")) {
    return { status: "success", message: t.sent };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = t.nameError;
  }
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) {
    errors.email = t.emailError;
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    errors.message = t.messageError;
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: t.fix, errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contato: defina RESEND_API_KEY e CONTACT_TO_EMAIL no .env.local");
    return { status: "error", message: t.unavailable, values };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>",
      to: [to],
      reply_to: values.email,
      subject: `Contato pelo portfólio: ${values.name}`,
      text: `Nome: ${values.name}\nE-mail: ${values.email}\nIdioma do site: ${lang}\n\n${values.message}`,
    }),
  });

  if (!res.ok) {
    console.error("Contato: falha no Resend", res.status, await res.text());
    return { status: "error", message: t.failed, values };
  }

  return { status: "success", message: t.sent };
}
