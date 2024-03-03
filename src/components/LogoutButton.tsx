"use client";

import React from "react";
import { Button, ButtonProps } from "./ui/button";

export const LogoutButton = ({ size }: { size?: ButtonProps["size"] }) => {
  const logout = async () => {
    await fetch("/logout");
    window.location.reload();
  };

  return (
    <Button size={size} variant="outline" onClick={logout}>
      Log out
    </Button>
  );
};
