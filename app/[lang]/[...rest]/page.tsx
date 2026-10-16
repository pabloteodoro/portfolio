import { notFound } from "next/navigation";

// Qualquer caminho que não existe cai aqui e mostra o not-found.tsx traduzido, dentro do layout
export default function CatchAll() {
  notFound();
}
