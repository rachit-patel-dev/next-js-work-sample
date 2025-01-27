"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// * Helpers
import { constants } from "@/helpers/constants";

import { AuthGuardType } from "@/types";

const AuthGuard = ({ children }: AuthGuardType) => {
  const [loginToken, setLoginToken] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isToken = Boolean(localStorage.getItem(constants.LOGIN_TOKEN));
    setLoginToken(isToken);
    setIsLoading(true);
    if (!isToken && !isLoading) {
      redirect("/login");
    }
  }, [loginToken, isLoading]);

  return loginToken && <>{children}</>;
};

export default AuthGuard;
