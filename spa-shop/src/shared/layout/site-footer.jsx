import { useContext } from "react";
import { SiteContext } from "./app-context-wrapper";

export default function SiteFooter() {
  const { siteData } = useContext(SiteContext);

  return (
    <footer id="pagefoot">
      © {new Date().getFullYear()} {siteData.sitetitle} * All Rights Reserved.
    </footer>
  );
}
