import type { PropsWithChildren } from "react";

interface Props {
  size: number;
  start: number;
}

export const VirtualItem = ({
  size,
  start,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${size}px`,
        transform: `translateY(${start}px)`,
      }}
    >
      {children}
    </div>
  );
};
