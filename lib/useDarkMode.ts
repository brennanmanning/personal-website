import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    if (theme) {
      window.document.documentElement.classList.add("dark")
    } else {
      window.document.documentElement.classList.remove("dark") 
    }
  }, [theme]);


  return {theme, setTheme};
}
