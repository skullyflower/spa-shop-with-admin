import useSiteStore from "@/state/zustand";
import MiniCart from "@/components/cart/MiniCart";
export default function SiteFooter() {
  const company_name = useSiteStore((state) => state.siteData.company_name);
  return (
    <footer id="pagefoot">
      © {new Date().getFullYear()} {company_name} * All Rights Reserved.
      <MiniCart />
    </footer>
  );
}
