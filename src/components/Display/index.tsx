import { ReactNode, useEffect } from "react";

type Props = {
  criteria: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  callback?: () => void;
  callbackCriteria?: boolean;
};
export const Display = ({
  criteria,
  fallback,
  children,
  callback,
  callbackCriteria = true,
}: Props) => {
  useEffect(() => {
    if (callback && callbackCriteria) {
      callback();
    }
  }, [callback, callbackCriteria]);
  if (!criteria && fallback) return <>{fallback}</>;
  if (!criteria) return null;

  return <>{children}</>;
};
