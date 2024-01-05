import { ReactNode } from "react";

type Props = {
    criteria: boolean;
    children: ReactNode;
    fallback?: ReactNode;
};
export const Display = ({ criteria, fallback, children }: Props) => {
    if (!criteria && fallback) return <>{fallback}</>;
    if (!criteria) return null;

    return <>
        {children}
    </>
}