import { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/theme";

export default function useThemeMode() {
  // set theme based on prefers-color-scheme
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? darkTheme
      : lightTheme
  );

  // update theme when prefers-color-scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleChange() {
      setTheme(mediaQuery.matches ? darkTheme : lightTheme);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return theme;
}
