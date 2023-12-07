import { siteData } from "../../state/pageData";
import MiniCart from "../cart/miniCart";
export default function SiteFooter() {
  return (
    <footer id="pagefoot">
      © {new Date().getFullYear()} {siteData.company_name} * All Rights Reserved.
      <MiniCart />
    </footer>
  );
}
