export function parseFilters<T extends object>(filters?: T) {
  const parsedFilters: Record<string, unknown> = {};
  if (!filters) return parsedFilters;

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) parsedFilters[key] = value.join(",");
    else parsedFilters[key] = value;
  });
  return parsedFilters;
}
