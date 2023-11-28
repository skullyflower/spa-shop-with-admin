import { aboutData } from "../../state/pageData";

export default function About() {
  const { page_content } = aboutData;
  return (
    <section
      id="content"
      className="about">
      <div
        dangerouslySetInnerHTML={{
          __html: page_content,
        }}
      />
    </section>
  );
}
