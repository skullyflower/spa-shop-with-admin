import { use } from "react";
import useUpdateHead from "../../shared/updateHead";
import SemiSafeContent from "../../shared/utilities/SemiSafeContent";
import s from "./homepage.module.css";
import { siteData } from "../../state/pageData";

export default function HomePage() {
  const { page_title, page_description, page_content } = siteData;
  useUpdateHead(page_title, page_description);

  return (
    <section
      id="content"
      className="homepage">
      <div className={s.homepageContent}>
        <SemiSafeContent rawContent={page_content} />
      </div>
    </section>
  );
}
