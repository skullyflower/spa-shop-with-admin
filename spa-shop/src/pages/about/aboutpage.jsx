import { useEffect } from "react";
import About from "../../shared/about/about.jsx";
import updateHead from "../../shared/updateHead.js";
import { aboutData } from "../../state/pageData.js";

export default function AboutPage() {
  const { page_title, page_description } = aboutData;

  useEffect(() => {
    updateHead(page_title, page_description);
  }, [page_title, page_description]);

  return <About />;
}
