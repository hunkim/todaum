import { redirect } from "next/navigation";
import { Home } from "./ui";
import { resolveToDaum } from "@/lib/resolve";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ u?: string; url?: string }>;
}) {
  const sp = await searchParams;
  const raw = (sp.u || sp.url || "").trim();
  if (raw) {
    const dest = await resolveToDaum(raw);
    redirect(dest);
  }
  return <Home />;
}
