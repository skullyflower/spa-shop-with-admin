import useUpdateHead from "@/utilities/UpdateHead";
import useSiteStore from "@/state/zustand.js";
import SemiSafeContent from "@/components/SemiSafeContent.js";

export default function AboutPage() {
  const { page_title, page_content, page_description } = useSiteStore((state) => state.aboutData);
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
