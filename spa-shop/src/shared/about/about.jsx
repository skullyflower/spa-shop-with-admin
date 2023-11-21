import { aboutData } from "../../state/pageData";

export default function About() {
  const { page_content } = aboutData;
  return (
    <section>
      <div
        dangerouslySetInnerHTML={{
          __html: page_content,
        }}
      />
    </section>
  );
}
