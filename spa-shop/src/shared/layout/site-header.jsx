//import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import siteData from "./site-data.json";
import MainNavigation from "../navigation/main-nav";

export default function SiteHeader() {
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
      <nav id="topnav">
        <MainNavigation />
      </nav>
    </header>
  );
}
