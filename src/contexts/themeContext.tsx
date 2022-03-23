import React, { createContext, ReactNode, useContext, useState } from "react";

type ThemeContextData = {
  toggleTheme: () => void,
  isLightTheme: boolean;
}

export const ThemeContext = createContext({} as ThemeContextData);

type ThemeContextProviderProps = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {


  const [isLightTheme, setIsLightTheme] = useState(true)

  function toggleTheme() {
    setIsLightTheme(!isLightTheme);

    const r = document.querySelector(':root') as HTMLElement
    if (!isLightTheme) {
      r.style.setProperty('--white', '#FFF');
      r.style.setProperty('--gray-50', '#F7F8FA');
      r.style.setProperty('--gray-100', '#E6E8EB');
      r.style.setProperty('--gray-200', '#AFB2B1');
      r.style.setProperty('--gray-500', '#808080');
      r.style.setProperty('--gray-800', '#494D4B');
      r.style.setProperty('--purple-300', '#9F75FF');
      r.style.setProperty('--purple-400', '#9164FA');
      r.style.setProperty('--purple-500', '#8257E5');
      r.style.setProperty('--purple-800', '#6F48C9');
    } else {
      r.style.setProperty('--white', '#000');
      r.style.setProperty('--gray-50', '#111111');
      r.style.setProperty('--gray-100', '#232323');
      r.style.setProperty('--gray-200', '#272727');
      r.style.setProperty('--gray-500', '#696969');
      r.style.setProperty('--gray-800', '#7A7A7A');
      r.style.setProperty('--purple-300', '#9F75FF');
      r.style.setProperty('--purple-400', '#6E3DE1');
      r.style.setProperty('--purple-500', '#4F1EC2');
      r.style.setProperty('--purple-800', '#6F48C9');
    }
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, isLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );

}

export const useTheme = () => {
  return useContext(ThemeContext);
}