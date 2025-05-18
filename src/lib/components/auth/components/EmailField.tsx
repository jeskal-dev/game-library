import type { AuthValues } from "@/lib/domain/validations";
import { FormControl, FormField, FormItem, FormMessage } from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import type { UseFormReturn } from "react-hook-form";

export function EmailField({
  form,
  isLoading,
}: Readonly<{
  form: UseFormReturn<AuthValues>;
  isLoading: boolean;
}>) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className="bg-neutral-700/20 border-neutral-600 text-neutral-100 h-12 rounded-md focus:ring-1 focus:ring-neutral-300"
              placeholder="Correo electrónico"
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage className="text-red-300/80 text-xs" />
        </FormItem>
      )}
    />
  );
}
