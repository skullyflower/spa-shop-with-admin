import SiteRoutes from "@/components/navigation/Routes";
import useSiteStore from "@/state/zustand";
import { useEffect } from "react";
import "./AppLayout.css";
import "./AppTheme.css";

function App() {
  const createStoreFromData = useSiteStore((store) => store.createStoreFromData);
  useEffect(() => {
    createStoreFromData();
  }, []);
  //const site_theme = useSiteStore((store) => store.siteData.site_theme);
  return <SiteRoutes />;
}

export default App;
