import { useCallback, useEffect, useState } from "react";
import EditBlogEntry from "./blogentryeditor";
import { convertDate } from "../bits/datetimebit";
import { Alert, Box, Button, HStack, Heading, Image, Stack } from "@chakra-ui/react";

const getBlogEntries = (setBlogEntries, setMessages) => {
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
    const imagesArr = Array.from(values.newImage);
    var formData = new FormData();
    formData.append("entry", JSON.stringify({ ...values, date: convertDate(dateforPost, "iso") }));

    for (var file of imagesArr) {
      formData.append("newImage", file);
    }

    fetch("http://localhost:4242/api/blog", {
      method: "POST",
      body: formData,
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
      const blogid = e?.target?.value;
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
      const blogid = e?.target?.value ? e.target.value : null;
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
      <HStack justifyContent="space-evenly">
        <div style={{ width: "30%" }}>{messages && <Alert>{messages}</Alert>}</div>
        <Heading
          textAlign="center"
          w="30%"
          size="md">
          Update the Blarrgh
        </Heading>
        <Button
          value="newentry"
          w="30%"
          onClick={toggleForm}>
          {showForm ? "Never mind" : "Add a new one"}
        </Button>
      </HStack>
      {showForm && (
        <EditBlogEntry
          blogid={activeBlog}
          blogEntries={blogEntries}
          toggleForm={toggleForm}
          onSubmit={onSubmit}
        />
      )}
      <Box p={5}>
        <Stack>
          {blogEntries?.length ? (
            blogEntries.map(
              (blog) =>
                blog && (
                  <HStack
                    key={blog.id}
                    p={5}
                    border="1px solid"
                    borderRadius={5}
                    w="100%"
                    alignItems="flex-start"
                    justifyContent="space-between">
                    <Image
                      src={`http://localhost:3000/${blog.image}`}
                      boxSize="75px"
                      alt={blog.imagealt}
                      fallbackSrc="http://localhost:3000/images/image-loading.svg"
                    />
                    <div
                      style={{
                        textAlign: "left",
                        display: "inline-block",
                        width: "60%",
                        verticalAlign: "top",
                      }}>
                      <Heading size="md">{blog.title}</Heading>
                      <div>
                        <a
                          href={`http://localhost:3000/blogentry/${blog.id}`}
                          target="blogwindow">
                          {blog.heading}
                        </a>
                        <p>{blog.date}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="shopButt"
                      value={blog.id}
                      onClick={doDelete}>
                      X
                    </Button>
                    <Button
                      size="sm"
                      className="shopButt"
                      value={blog.id}
                      onClick={toggleForm}>
                      Edit
                    </Button>
                  </HStack>
                ),
            )
          ) : (
            <p className="centered">no blog entries yet</p>
          )}
        </Stack>
      </Box>
    </div>
  );
};
export default Blog;
