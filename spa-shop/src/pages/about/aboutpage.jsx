import { useEffect } from "react";
import useUpdateHead from "../../shared/updateHead.js";
import { aboutData } from "../../state/pageData.js";

export default function AboutPage() {
  const { page_title, page_content, page_description } = aboutData;
  useUpdateHead(page_title, page_description);

  return (
    <section
      id="content"
      className="about">
      <div className="content">
        <h1>{page_title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: page_content,
          }}
        />
      </div>
    </section>
  );
}
