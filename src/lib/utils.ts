import { auth } from "@clerk/nextjs/server";

export async function Role() {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: string })?.role ?? "user";
}
