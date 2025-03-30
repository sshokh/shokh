"use client"

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";

export default function Provider({ children }) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>);
}