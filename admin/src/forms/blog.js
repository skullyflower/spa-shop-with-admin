import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.bubble.css";
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
const today = new Date();

const newblog = {
  id: convertDate(today, "id"),
  date: convertDate(today, "input"),
  title: "",
  imagelink: "https://www.skullyflower.com/",
  image: "https://www.skullyflower.com/",
  imagealt: "",
  imgcaption: "",
  heading: "",
  text: "",
  tags: [],
};

const EditBlogEntry = ({ blogid, blogEntries, toggleCatForm, onSubmit }) => {
  const entry = blogEntries.filter((blog) => blog.id === blogid);
  const thisEntry = entry[0] || newblog;

  if (!!entry[0]) {
    const ms = Date.parse(thisEntry.date);
    const entrydate = new Date(ms);
    thisEntry.date = convertDate(entrydate, "input");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: thisEntry, mode: "onChange" });

  const handleTextChange = (newText) => {
    setValue("text", newText);
  };

  return (
    <div className="show">
      <div id="overlay"></div>
      <div className="floater">
        <form
          id="adminForm"
          method="POST">
          <button
            className="shopButt right"
            onClick={toggleCatForm}>
            Never mind
          </button>
          <div>
            <label>Id:</label>{" "}
            <input
              disabled
              type="text"
              {...register("id")}
            />
          </div>
          <div>
            <label>Date:</label>{" "}
            <input
              className={errors.date ? "is-invalid" : ""}
              type="datetime-local"
              {...register("date", { required: true })}
            />
          </div>
          <div>
            <label>Title:</label>{" "}
            <input
              className={errors.title ? "is-invalid" : ""}
              type="text"
              {...register("title", { required: true })}
            />
          </div>
          <div>
            {thisEntry.image !== newblog.image && (
              <img
                src={thisEntry.image}
                alt={thisEntry.imagealt}
                width="100"
              />
            )}
            <label>Image Source URL:</label>{" "}
            <input
              className={errors.image ? "is-invalid" : ""}
              type="url"
              {...register("image")}
            />
          </div>
          <div>
            <label>Alt Text:</label>{" "}
            <input
              className={errors.imagealt ? "is-invalid" : ""}
              type="text"
              {...register("imagealt")}
            />
          </div>
          <div>
            <label>Content Link:</label>{" "}
            <input
              className={errors.imagelink ? "is-invalid" : ""}
              type="url"
              {...register("imagelink")}
            />
          </div>
          <div>
            <label>Image Caption:</label>{" "}
            <input
              className={errors.imgcaption ? "is-invalid" : ""}
              type="text"
              {...register("imgcaption")}
            />
          </div>
          <div>
            <label>Heading:</label>{" "}
            <input
              className={errors.heading ? "is-invalid" : ""}
              type="text"
              {...register("heading", { required: true })}
            />
          </div>
          <div>
            <label>Blog Content:</label>{" "}
            <div className="content">
              <ReactQuill
                id="quill"
                className={errors.text ? "is-invalid" : ""}
                theme="bubble"
                defaultValue={thisEntry.text}
                onChange={handleTextChange}
              />
            </div>
          </div>
          <div>
            <label>Tags</label>
            TODO: add tags for filtering.
          </div>
          <div>
            <button
              className="shopButt"
              onClick={handleSubmit(onSubmit)}>
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const Blog = () => {
  const [blogEntries, setBlogEntries] = useState(null);
  const [messages, setMessages] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

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
      setActiveCat(blogid);
      setShowCatForm(!!blogid);
    },
    [setActiveCat, setShowCatForm],
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
        {showCatForm ? "Never mind" : "Add a new one"}
      </button>
      {showCatForm && (
        <div>
          <EditBlogEntry
            blogid={activeCat}
            blogEntries={blogEntries}
            toggleCatForm={toggleForm}
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
