import SiteRoutes from "@/components/Routes";
import "@/scss/flexstyle.scss";
import "@/scss/skullyflower.scss";
import "@/scss/xtrahalloween.scss";
import useSiteStore from "@/state/zustand";
import { useEffect } from "react";

function App() {
  const createStoreFromData = useSiteStore((store) => store.createStoreFromData);
  useEffect(() => {
    createStoreFromData();
  }, []);
  //const site_theme = useSiteStore((store) => store.siteData.site_theme);
  return (
    <div>
      <SiteRoutes />
    </div>
  );
}

export default App;
