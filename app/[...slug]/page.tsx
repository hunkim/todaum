import { redirect } from "next/navigation";
import { Home } from "../ui";
import { resolveToDaum, urlFromSlug } from "@/lib/resolve";

export const dynamic = "force-dynamic";

export default async function CatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const url = urlFromSlug(slug);
  if (!url) return <Home />;
  redirect(await resolveToDaum(url));
}
