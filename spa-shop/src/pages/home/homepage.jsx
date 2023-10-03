import { useEffect } from "react";
import About from "../../shared/about/about";
import { updateHead } from "../../shared/layout/site-header.jsx";
import siteData from "../../shared/layout/site-data.json";

export default function HomePage() {
  const { page_title, page_description, page_content } = siteData;
  useEffect(() => {
    updateHead(page_title, page_description);
  }, [page_title, page_description]);

  return (
    <div>
      <h1>{page_title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: page_content,
        }}
      />
      <About />
    </div>
  );
}
