import type { PropsWithChildren, Ref } from "react";

interface Props {
  ref: Ref<HTMLElement> | undefined;
  className?: string;
}

export const VirtualRoot = ({
  ref,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <div ref={ref as never} className={className}>
      {children}
    </div>
  );
};
