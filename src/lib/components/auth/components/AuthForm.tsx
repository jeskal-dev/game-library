import { Form } from "@/lib/ui/form";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthForm } from "../hooks/useAuthForm";
import { activeTab } from "../signals";
import { EmailField } from "./EmailField";
import { StatusMessage } from "./StatusMessage";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";

export function AuthForm() {
  const { form, onSubmit, isLoading, mutationError, isSuccess } = useAuthForm();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab.value}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <EmailField form={form} isLoading={isLoading} />
              <PasswordField form={form} isLoading={isLoading} />
            </div>

            <StatusMessage
              mutationError={mutationError}
              isSuccess={isSuccess}
            />

            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  );
}
