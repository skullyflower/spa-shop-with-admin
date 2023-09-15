import React from "react";
import ImageLoader from "./image-loader";

const BlogEntry = ({ blogentry, list }) => {
  const { date, image, imagealt, imagelink, imgcaption, heading, text, title } = blogentry;
  let edate = new Date(date);
  return (
    <article className="anentry">
      <div className="content">
        <h2 className="blog_head">
          <time style={{ float: "right" }}> {edate.toDateString()}</time>
          {title}
        </h2>
        <div
          className="centered"
          style={list ? { float: "left", maxWidth: "38%", padding: "10px" } : {}}>
          <a href={imagelink}>
            <ImageLoader
              src={image}
              alt={imagealt}
            />
          </a>
          <div
            dangerouslySetInnerHTML={{
              __html: imgcaption,
            }}></div>
        </div>
        <h3>{heading}</h3>
        <div
          className="blogtext"
          dangerouslySetInnerHTML={{ __html: text }}></div>
        <br clear="all" />
      </div>
    </article>
  );
};

export default BlogEntry;
