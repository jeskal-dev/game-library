import { useService } from "@/core";
import { AuthService } from "@/lib/domain/services/AuthService";
import { authSchema, type AuthValues } from "@/lib/domain/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { activeTab } from "../signals";

export function useAuthForm() {
  const auth = useService(AuthService);
  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const {
    mutateAsync: authMutation,
    isPending: isLoading,
    error: mutationError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (values: AuthValues) => {
      return activeTab.value === "login"
        ? auth.login(values)
        : auth.register(values);
    },
    onSuccess: () => form.reset(),
  });

  useEffect(() => reset(), [activeTab, reset]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(reset, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);
  return {
    form,
    onSubmit: authMutation as unknown as (values: AuthValues) => Promise<void>,
    isLoading,
    mutationError,
    isSuccess,
  };
}
