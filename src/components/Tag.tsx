import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

export default function Tag({ children }: TagProps) {
  return <span className="-zag-text -zag-bg zag-transition px-2 py-1 text-sm font-semibold">{children}</span>;
}
