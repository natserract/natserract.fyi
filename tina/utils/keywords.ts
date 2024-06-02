export function toKeywords(k: string | null | undefined) {
  if (!k) return [];
  return k.split(", ");
}
