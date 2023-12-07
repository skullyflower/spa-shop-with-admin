import { Link } from "react-router-dom";
import { siteData } from "../../state/pageData";
import MainNavigation from "../navigation/main-nav";
import MobileMenu from "../navigation/mobilemenu";
import { useCartStore } from "../../state/cartData";

export default function SiteHeader() {
  const topnavexpanded = useCartStore((store) => store.topnavexpanded);
  return (
    <header id="pagetop">
      <Link
        to="/"
        id="logo">
        <img
          src={`/${siteData.sitelogo}`}
          className="App-logo"
          alt={siteData.company_name}
        />
      </Link>
      <MobileMenu />
      <nav
        id="topnav"
        className={topnavexpanded ? "expanded" : undefined}>
        <MainNavigation />
      </nav>
    </header>
  );
}
