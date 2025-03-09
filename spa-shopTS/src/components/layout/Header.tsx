import React from "react";
import Navigation from "../navigation/Navigation";
import { siteData } from "@/state/pageData";

const Header: React.FC = () => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;
