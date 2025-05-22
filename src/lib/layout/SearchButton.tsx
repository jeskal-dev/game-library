import { SearchIcon } from "lucide-react";

export function SearchButton() {
  return (
    <button className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-emerald-600 dark:hover:text-emerald-400">
      <SearchIcon className="text-neutral-400" />
    </button>
  );
}
