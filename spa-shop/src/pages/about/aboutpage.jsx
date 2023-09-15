import { useEffect } from "react";
import About from "../../shared/about/about.jsx";
import { updateHead } from "../../shared/layout/site-header.jsx";
import aboutdata from "../../shared/about/about-data.json";

export default function AboutPage() {
  const { page_title, page_description } = aboutdata;
  useEffect(() => {
    updateHead(page_title, page_description);
  }, [page_title, page_description]);

  return (
    <div>
      <About />
    </div>
  );
}
