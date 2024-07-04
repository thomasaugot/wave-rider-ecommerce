// exodar font has a big line height, causing some iregularities in the UI
// applying this hook will set a negative margin top to solve this

"use client";

import { useEffect } from "react";
import "@/styles/globals.scss";

export const useExodarFont = () => {
  useEffect(() => {
    const elements = document.querySelectorAll("*");

    elements.forEach((element) => {
      const fontFamily = getComputedStyle(element).fontFamily;
      if (fontFamily.includes("exodar")) {
        element.classList.add("exodar-font");
        (element as HTMLElement).style.marginTop = "-5px";
      }
    });
  }, []);
};
