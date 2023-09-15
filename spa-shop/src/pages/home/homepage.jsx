import { useEffect } from "react";
import About from "../../shared/about/about";
import { updateHead } from "../../shared/layout/site-header.jsx";
import siteData from "../../shared/layout/site-data.json";

export default function HomePage() {
  const { sitetitle, sitedescription, page_content } = siteData;
  useEffect(() => {
    updateHead(sitetitle, sitedescription);
  }, [sitetitle, sitedescription]);

  return (
    <div>
      <h1>Home Page</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: page_content,
        }}
      />
      <About />
    </div>
  );
}
