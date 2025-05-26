import type { PropsWithChildren } from "react";

interface Props {
  totalSize: number;
  className?: string;
}

export const VirtualContainer = ({
  className = "w-full",
  totalSize,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div style={{ height: `${totalSize}px` }} className={className}>
      {children}
    </div>
  );
};
