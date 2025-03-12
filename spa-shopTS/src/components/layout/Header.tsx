import React from "react";
import Navigation from "../navigation/Navigation";
import useSiteStore from "@/state/zustand";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { sitelogo, company_name } = useSiteStore((state) => state.siteData);
  const topnavexpanded = useSiteStore();

  return (
    <header id="pageTop">
      <Link to="/">
        <img
          src={`/${sitelogo}`}
          className="App-logo"
          alt={company_name}
        />
      </Link>
      <nav
        id="topnav"
        className={topnavexpanded ? "expanded" : undefined}>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;
