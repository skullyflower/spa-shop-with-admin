import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BlogEntry from "../../../shared/blog/blogentrybox";

export default function BlogPage({ blog }) {
  return (
    <section id="content">
      <div className="entries">
        <BlogEntry blogentry={blog} />
        <p className="center">
          <Link to="/blog">Back to Blog</Link>
        </p>
      </div>
    </section>
  );
}
BlogPage.propTypes = {
  blog: PropTypes.object,
};
