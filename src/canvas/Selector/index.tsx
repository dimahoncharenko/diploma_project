import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export function Selector({ children }: Props) {
  return <group name="selector">{children}</group>;
}