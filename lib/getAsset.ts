// lib/getAsset.ts
export function getAsset(path: string) {
  // If NEXT_PUBLIC_BASE_PATH is set (e.g. "/RepoName"), prefix it.
  // Otherwise return path as-is for local dev.
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${prefix}${path}`;
}
