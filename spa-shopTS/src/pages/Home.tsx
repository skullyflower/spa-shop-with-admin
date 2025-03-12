import useUpdateHead from "@/utilities/UpdateHead";
import useSiteStore from "@/state/zustand";
import SemiSafeContent from "@/components/SemiSafeContent";

const Home: React.FC = () => {
  const { page_title, page_description, page_content } = useSiteStore((state) => state.siteData);
  useUpdateHead(page_title, page_description);

  return (
    <section
      id="content"
      className="homepage">
      <div>
        <SemiSafeContent rawContent={page_content} />
      </div>
    </section>
  );
};

export default Home;
