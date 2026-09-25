export function isMissingRelationError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;

  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    /relation .* does not exist|table .* not found|schema cache/i.test(error.message ?? "")
  );
}
