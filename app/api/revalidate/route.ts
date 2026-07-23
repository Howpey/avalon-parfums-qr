import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { PRODUCTS_TAG } from "../../lib/products";

/**
 * Called by the Avalon CRM's Supabase Database Webhook whenever a product is
 * inserted, updated or deleted, so the catalog refreshes within seconds.
 *
 * Auth: shared secret in the `x-revalidate-secret` header (or `?secret=`).
 */
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "REVALIDATE_SECRET not configured" }, { status: 500 });
  }

  const provided =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (provided !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  revalidateTag(PRODUCTS_TAG);
  return NextResponse.json({ revalidated: true, tag: PRODUCTS_TAG, at: Date.now() });
}
