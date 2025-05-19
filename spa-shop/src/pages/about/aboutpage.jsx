import useUpdateHead from "../../shared/updateHead.js";
import { aboutData } from "../../state/pageData.js";
import SemiSafeContent from "../../shared/utilities/SemiSafeContent.jsx";
import ComingSoon from "../../shared/coming-soon.jsx";

export default function AboutPage() {
  if (!aboutData) return <ComingSoon />;

  const { page_title, page_content, page_description } = aboutData;
  useUpdateHead(page_title, page_description);

  return (
    <section
      id="content"
      className="about">
      <div className="content">
        <h1>{page_title}</h1>
        <SemiSafeContent rawContent={page_content} />
      </div>
    </section>
  );
}
