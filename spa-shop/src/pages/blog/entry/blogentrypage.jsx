import { useParams } from "react-router-dom";
import { blogData } from "../../../state/pageData";
import ImageLoader from "../../../shared/image-loader";
import BlogEntryBox from "../../../shared/blog/blogentrybox";

export default function BlogEntryPage() {
  const { blog_id } = useParams();
  const entries = blogData.entries;
  const blog = blogData.entries.find((item) => item.id === blog_id);
  const { date, image, imagealt, imagelink, imgcaption, heading, text, title } = blog;
  let edate = new Date(date);
  return (
    <section
      id="content"
      className="blog">
      <div className="content">
        <article className="anentry">
          <h2 className="blog_head">
            <time style={{ float: "right" }}> {edate.toDateString()}</time>
            {title}
          </h2>
          <div className="centered">
            <a href={imagelink}>
              <ImageLoader
                src={image}
                alt={imagealt}
              />
            </a>
            <div>{imgcaption}</div>
          </div>
          <h3>{heading}</h3>
          <div
            className="blogtext"
            dangerouslySetInnerHTML={{ __html: text }}></div>
          <br clear="all" />
        </article>
        {entries.length > 1 && (
          <aside>
            <h2>More blog posts ...</h2>
            <div
              id="blog_entries"
              className="entries">
              {entries.map((entry) => (
                <BlogEntryBox
                  key={entry.id}
                  blogentry={entry}
                />
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
