import { useCallback, useEffect, useState } from "react";
import EditBlogEntry from "./blogentryeditor";
import { convertDate } from "../bits/datetimebit";

const getBlogEntries = (setBlogEntries, setMessages) => {
  setBlogEntries([]);
  fetch("http://localhost:4242/api/blog")
    .then((data) => data.json())
    .then((json) => {
      const entries = json.entries;
      if (Array.isArray(entries)) {
        setBlogEntries(entries);
      } else {
        setBlogEntries([]);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get blog entries.");
    });
};

const Blog = () => {
  const [blogEntries, setBlogEntries] = useState(null);
  const [messages, setMessages] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);

  const onSubmit = (values) => {
    const dateforPost = new Date(values.date);
    const blogPostData = { entry: { ...values, date: convertDate(dateforPost, "iso") } }; //adds or updates.
    fetch("http://localhost:4242/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogPostData),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getBlogEntries(setBlogEntries, setMessages);
        toggleForm();
      })
      .catch((err) => {
        setMessages(err.message || "there was a problem.");
      });
  };
  const doDelete = useCallback((e) => {
    if (window.confirm("Are you sure you want to do this?")) {
      const blogid = e.target.value;
      fetch(`http://localhost:4242/api/blog/${blogid}`, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((json) => {
          setMessages(json.message);
          getBlogEntries(setBlogEntries, setMessages);
        });
    }
  }, []);

  const toggleForm = useCallback(
    (e) => {
      const blogid = e && e.target.value ? e.target.value : null;
      setActiveBlog(blogid);
      setShowForm(!!blogid);
    },
    [setActiveBlog, setShowForm],
  );

  useEffect(() => {
    if (!blogEntries && !messages) {
      getBlogEntries(setBlogEntries, setMessages);
    }
  }, [blogEntries, messages, setBlogEntries, setMessages]);

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <h3>Update the Blarrgh</h3>
      <button
        className="shopButt"
        value="newentry"
        onClick={toggleForm}>
        {showForm ? "Never mind" : "Add a new one"}
      </button>
      {showForm && (
        <div>
          <EditBlogEntry
            blogid={activeBlog}
            blogEntries={blogEntries}
            toggleForm={toggleForm}
            onSubmit={onSubmit}
          />
        </div>
      )}{" "}
      <div id="adminList">
        {blogEntries &&
          blogEntries.map((blog) =>
            blog ? (
              <div
                key={blog.id}
                style={{ display: "flex", justifyContent: "space-between" }}>
                <img
                  src={blog.image}
                  style={{ width: "75px" }}
                  alt={blog.imagealt}
                />
                <div
                  style={{
                    textAlign: "left",
                    display: "inline-block",
                    width: "60%",
                    verticalAlign: "top",
                  }}>
                  {blog.title}{" "}
                  <h3>
                    <a
                      href={`http://localhost:3000/blogentry/${blog.id}`}
                      target="blogwindow">
                      {blog.heading}
                    </a>
                    <p>{blog.date}</p>
                  </h3>
                </div>
                <button
                  className="shopButt"
                  value={blog.id}
                  onClick={doDelete}>
                  X
                </button>
                <button
                  className="shopButt"
                  value={blog.id}
                  onClick={toggleForm}>
                  Edit
                </button>
              </div>
            ) : null,
          )}
      </div>
    </div>
  );
};
export default Blog;
