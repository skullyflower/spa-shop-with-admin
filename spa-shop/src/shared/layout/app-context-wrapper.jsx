import { createContext, useState } from "react";
import sitedata from "./site-data.json";
export const SiteContext = createContext({});

export default function AppContextProvider({ children }) {
  const [siteData, setSiteData] = useState(sitedata);
  return (
    <SiteContext.Provider
      value={{
        siteData: siteData,
        setSiteData: setSiteData,
      }}>
      {children}
    </SiteContext.Provider>
  );
}
