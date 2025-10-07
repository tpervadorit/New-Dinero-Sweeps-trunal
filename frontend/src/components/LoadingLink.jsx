"use client";

import Link from "next/link";
import { useStateContext } from "@/store";

export default function LoadingLink({ href, children, ...props }) {
  const { dispatch } = useStateContext();

  const handleClick = () => {
    dispatch({ type: "SET_ROUTE_LOADING", payload: true });
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
