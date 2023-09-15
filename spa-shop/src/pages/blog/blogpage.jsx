import { Link } from "react-router-dom";
import blogData from "../../shared/blog/blog-data.json";
import ImageLoader from "../../shared/image-loader";

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
            <BlogItem
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

function BlogItem({ blogentry }) {
  const { date, id, image, imagealt, imgcaption, heading, title } = blogentry;
  let edate = new Date(date);

  return (
    <div className="shopItem">
      <div>
        <h2 className="blog_head">
          <Link to={"/blogentry/" + id}>{title}</Link>
        </h2>
        <div className="content">
          <div className="centered">
            <Link to={"/blog/entry/" + id}>
              <ImageLoader
                src={image}
                alt={imagealt}
              />
            </Link>
            <div
              dangerouslySetInnerHTML={{
                __html: imgcaption,
              }}></div>
          </div>
          <h3>
            <Link to={"/blog/entry/" + id}>{heading}</Link>
          </h3>
          <time>{edate.toDateString()}</time>
        </div>
      </div>
      <p className="textright">
        <Link to={"/blog/entry/" + id}>Read It</Link>
      </p>
    </div>
  );
}
