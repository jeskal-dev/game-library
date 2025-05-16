import { useService } from "@/core";
import { AuthService } from "@/lib/domain/services/AuthService";
import { authSchema, type AuthValues } from "@/lib/domain/validations";
import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { Separator } from "@/lib/ui/seporator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useComputed, useSignal } from "@preact-signals/safe-react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Gamepad2, Loader2, Twitter } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

type TabState = "login" | "signup";
type Providers = "facebook" | "twitter";

function RouteComponent() {
  const auth = useService(AuthService);
  const activeTab = useSignal<TabState>("login");
  const buttonMessage = useComputed(() =>
    activeTab.value === "login" ? "Acceder" : "Crear Cuenta"
  );
  const successMessage = useComputed(() =>
    activeTab.value === "login"
      ? "¡Bienvenido de vuelta!"
      : "¡Cuenta creada! Revisa tu correo"
  );

  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });

  const {
    mutateAsync: authMutation,
    isPending: isLoading,
    error: mutationError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (values: AuthValues) => {
      switch (activeTab.value) {
        case "login": {
          return auth.login(values);
        }
        case "signup": {
          return auth.register(values);
        }
      }
    },
    onSuccess: () => form.reset(),
  });

  useEffect(() => reset(), [activeTab.value, reset]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(reset, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

  const handleSocialAuth = (provider: Providers) => {
    console.log(`Iniciando con ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          className={`relative overflow-hidden rounded-2xl border-neutral-800 bg-neutral-800/30 backdrop-blur-md`}
        >
          <div className="relative z-10 p-8 space-y-8 w-[400px]">
            <motion.div
              className="flex flex-col items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-3 rounded-md bg-neutral-700/50 backdrop-blur-sm">
                <Gamepad2 className="h-10 w-10 text-neutral-100" />
              </div>
              <h1 className="text-4xl font-light tracking-wide text-neutral-100">
                Gamelib
              </h1>
              <p className="text-neutral-400 text-sm tracking-widest">
                TU COLECCIÓN DE JUEGOS
              </p>
            </motion.div>

            {/* Tabs con transición */}
            <div className="flex justify-center relative">
              <div className="flex bg-neutral-700/30 p-1 rounded-md overflow-hidden">
                {(["login", "signup"] as const).map((tab) => (
                  <motion.div
                    key={tab}
                    className="px-1"
                    layout
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => (activeTab.value = tab)}
                      className={cn(
                        `relative px-8 py-2 rounded-lg transition-colors duration-200`,
                        activeTab.value === tab
                          ? "text-neutral-100"
                          : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700/20"
                      )}
                    >
                      {tab === "login" ? "Iniciar Sesión" : "Registrarse"}
                      {activeTab.value === tab && (
                        <motion.div
                          layoutId="tabIndicator"
                          className="absolute inset-0 bg-neutral-600/30 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Formulario minimalista */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((values) =>
                      authMutation(values)
                    )}
                    className="space-y-6"
                  >
                    {/* Campos del formulario */}
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                className={`bg-neutral-700/20 border-neutral-600 text-neutral-100 h-12 rounded-md focus:ring-1 focus:ring-neutral-300`}
                                placeholder="Correo electrónico"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-red-300/80 text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                className={`bg-neutral-700/20 border-neutral-600 text-neutral-100 h-12 rounded-md focus:ring-1 focus:ring-neutral-300`}
                                placeholder="Contraseña"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-red-300/80 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Mensajes de estado */}
                    <AnimatePresence mode="wait">
                      {(mutationError || isSuccess) && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`p-3 text-sm ${
                            mutationError
                              ? "bg-red-400/10 text-red-300"
                              : "bg-emerald-400/10 text-emerald-300"
                          }  rounded-md`}
                        >
                          {mutationError?.message ?? successMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Botón de enviar */}
                    <Button
                      className={`w-full h-12 bg-neutral-100/5 hover:bg-neutral-100/10 border border-neutral-600/50 text-neutral-100 rounded-lg transition-all`}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-2 items-center"
                        >
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Procesando...
                        </motion.span>
                      ) : (
                        buttonMessage
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </AnimatePresence>

            <Separator className="bg-neutral-700/30" />

            {/* Social Auth */}
            <div className="flex gap-3 justify-center">
              {[Facebook, Twitter].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className={`p-3 h-auto bg-transparent border-neutral-700/50 hover:bg-neutral-700/20 rounded-lg`}
                    onClick={() =>
                      handleSocialAuth(index === 0 ? "facebook" : "twitter")
                    }
                  >
                    <Icon className="h-5 w-5 text-neutral-300" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
