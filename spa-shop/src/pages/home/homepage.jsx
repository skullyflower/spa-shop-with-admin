import useUpdateHead from "../../shared/updateHead";
import { siteData } from "../../state/pageData";

export default function HomePage() {
  const { page_title, page_description, page_content } = siteData;
  useUpdateHead(page_title, page_description);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: page_content,
        }}
      />
    </div>
  );
}
