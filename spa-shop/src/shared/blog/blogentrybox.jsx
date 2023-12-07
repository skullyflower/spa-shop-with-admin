import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImageLoader from "../../shared/image-loader";

export default function BlogEntryBox({ blogentry }) {
  const { date, id, image, imagealt, imgcaption, heading, title } = blogentry;
  let edate = new Date(date);
  const linktoEntry = `/blog/entry/${id}`;
  return (
    <div className="shopItem">
      <div>
        <h2 className="blog_head">
          <Link to={linktoEntry}>{title}</Link>
        </h2>
        <div className="content">
          <div className="centered">
            <Link to={linktoEntry}>
              <ImageLoader
                src={image}
                alt={imagealt}
              />
            </Link>
            <div>{imgcaption}</div>
          </div>
          <h3>
            <Link to={linktoEntry}>{heading}</Link>
          </h3>
          <time>{edate.toDateString()}</time>
        </div>
      </div>
      <p className="textright">
        <Link to={linktoEntry}>Read It</Link>
      </p>
    </div>
  );
}
BlogEntryBox.propTypes = {
  blogentry: PropTypes.object,
};
