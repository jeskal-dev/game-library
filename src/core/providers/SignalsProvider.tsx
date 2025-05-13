import type { PropsWithChildren } from "react";
import { useSignals } from "@preact/signals-react/runtime";

const SignalsProvider = ({ children }: PropsWithChildren) => {
  useSignals();
  return children;
};

export default SignalsProvider;
