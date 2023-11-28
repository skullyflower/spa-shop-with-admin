import useUpdateHead from "../../shared/updateHead.js";
import { blogData } from "../../state/pageData";
import BlogEntry from "../../shared/blog/blogentrybox";

export default function BlogPage() {
  const { page_title, page_description, entries } = blogData;
  useUpdateHead(page_title, page_description);
  return (
    <section
      id="content"
      className="blog">
      <h1>{page_title}</h1>
      <div
        id="blog_entries"
        className="entries">
        {entries > 0 ? (
          entries.map((entry) => (
            <BlogEntry
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
