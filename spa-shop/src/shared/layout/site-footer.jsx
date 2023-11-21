import { siteData } from "../../state/pageData";

export default function SiteFooter() {
  return (
    <footer id="pagefoot">
      © {new Date().getFullYear()} {siteData.sitetitle} * All Rights Reserved.
    </footer>
  );
}
