"use server";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Campo invisível: só robôs preenchem
  if (formData.get("website")) {
    return { status: "success", message: "Mensagem enviada. Obrigado!" };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = "Informe seu nome (2 a 100 caracteres).";
  }
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) {
    errors.email = "Informe um e-mail válido.";
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    errors.message = "A mensagem precisa ter entre 10 e 5000 caracteres.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Corrija os campos destacados.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contato: defina RESEND_API_KEY e CONTACT_TO_EMAIL no .env.local");
    return {
      status: "error",
      message: "O envio está indisponível no momento. Tente pelo LinkedIn ou GitHub.",
      values,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>",
      to: [to],
      reply_to: values.email,
      subject: `Contato pelo portfólio: ${values.name}`,
      text: `Nome: ${values.name}\nE-mail: ${values.email}\n\n${values.message}`,
    }),
  });

  if (!res.ok) {
    console.error("Contato: falha no Resend", res.status, await res.text());
    return {
      status: "error",
      message: "Não consegui enviar agora. Tente de novo em instantes.",
      values,
    };
  }

  return { status: "success", message: "Mensagem enviada. Respondo assim que puder!" };
}
