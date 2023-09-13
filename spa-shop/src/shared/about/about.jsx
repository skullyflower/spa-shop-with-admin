import aboutdata from "./aboutdata.json";

export default function About() {
  const { page_title, page_content } = aboutdata;
  return (
    <section>
      <h1>{page_title}</h1>
      {page_content}
    </section>
  );
}
