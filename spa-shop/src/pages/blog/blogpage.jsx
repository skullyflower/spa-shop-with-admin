import useUpdateHead from "../../shared/updateHead.js";
import { blogData } from "../../state/pageData";
import BlogEntryBox from "../../shared/blog/blogentrybox";

export default function BlogPage() {
  const { page_title, page_description, page_content, entries } = blogData;
  useUpdateHead(page_title, page_description);
  return (
    <section
      id="content"
      className="blog">
      <h1>{page_title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: page_content,
        }}></div>
      <div
        id="blog_entries"
        className="entries">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <BlogEntryBox
              key={entry.id}
              blogentry={entry}
            />
          ))
        ) : (
          <div>No Blog Entries Yet.</div>
        )}
      </div>
    </section>
  );
}
