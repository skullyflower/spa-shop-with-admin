import { useEffect } from "react";
import About from "../../shared/about/about.jsx";
import useUpdateHead from "../../shared/updateHead.js";
import { aboutData } from "../../state/pageData.js";

export default function AboutPage() {
  const { page_title, page_description } = aboutData;
  useUpdateHead(page_title, page_description);

  return <About />;
}
