import { Outlet } from "react-router-dom";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export function updateHead(title, description) {
  const pageDescription = description
    ? description.replaceAll(/<[^>]*>/g, "")
    : "default content description";
  document.getElementsByTagName("meta")["description"].content = pageDescription;
  document.title = title;
}

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
