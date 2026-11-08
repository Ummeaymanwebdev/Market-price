import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/api";
import { banglaDate } from "@/lib/bn";
import { normalizeCategory, toArray } from "@/lib/normalize";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  await connection();

  const [res, session] = await Promise.all([
    getCategories(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  const categories = toArray(res).map(normalizeCategory);

  const user = session?.user
    ? { name: session.user.name, image: session.user.image ?? null }
    : null;

  return (
    <NavbarClient categories={categories} date={banglaDate()} user={user} />
  );
}