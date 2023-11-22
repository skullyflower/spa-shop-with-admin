import { siteData } from "../../state/pageData";
import MiniCart from "../cart/miniCart";
export default function SiteFooter() {
  return (
    <footer id="pagefoot">
      © {new Date().getFullYear()} {siteData.sitetitle} * All Rights Reserved.
      <MiniCart />
    </footer>
  );
}
