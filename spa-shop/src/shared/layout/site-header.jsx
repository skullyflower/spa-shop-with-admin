//import { Link } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SiteContext } from "./app-context-wrapper";
import MainNavigation from "../navigation/main-nav";

// SEO for one page app
export function updateHead(page_title, description) {
  const pageDescription = description;
  document.getElementsByTagName("meta")["description"].content = pageDescription?.replaceAll(
    /<[^>]*>/g,
    "",
  );
  const pageTitle = page_title;
  document.title = `${pageTitle}`;
}

export default function SiteHeader() {
  const { siteData } = useContext(SiteContext);
  return (
    <header id="pagetop">
      <Link
        to="/"
        id="logo">
        <img
          src={`/${siteData.sitelogo}`}
          className="App-logo"
          alt={siteData.sitetitle}
        />
      </Link>
      <nav id="topnav">
        <MainNavigation />
      </nav>
    </header>
  );
}
