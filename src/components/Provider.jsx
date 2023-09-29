"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const Provider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;
