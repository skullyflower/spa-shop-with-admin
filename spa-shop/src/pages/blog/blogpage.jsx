import blogData from "../../shared/blog/blog-data.json";
import BlogEntry from "../../shared/blog/blogentrybox";

export default function BlogPage() {
  const { page_title, entries } = blogData;
  return (
    <section>
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
