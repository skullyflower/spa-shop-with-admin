import { use } from "react";
import useUpdateHead from "../../shared/updateHead";
import SemiSafeContent from "../../shared/utilities/SemiSafeContent";
import s from "./homepage.module.css";
import { siteData } from "../../state/pageData";
import ComingSoon from "../../shared/coming-soon";

export default function HomePage() {
  if (!siteData) return <ComingSoon />;
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
