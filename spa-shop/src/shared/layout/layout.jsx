import { Outlet } from "react-router-dom";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export default function Layout() {
  return (
    <div id="main">
      <SiteHeader />
      <main id="pagebody">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
