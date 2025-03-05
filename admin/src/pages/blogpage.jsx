import { useCallback, useEffect, useState } from "react";
import EditBlogEntry from "../forms/blogentryeditor";
import EditBlogData from "../forms/blogdataeditor";
import { convertDate } from "../bits/datetimebit";
import { Box, Button, HStack, Heading, Image, Stack } from "@chakra-ui/react";
import PageLayout from "../bits/PageLayout";

const getBlogEntries = (setBlogEntries, setMessages, setBlogInfo) => {
  fetch("http://localhost:4242/api/blog")
    .then((data) => data.json())
    .then((json) => {
      const info = {
        page_title: json.page_title,
        page_description: json.page_description,
        page_content: json.page_content,
      };
      const entries = json.entries;
      if (Array.isArray(entries)) {
        setBlogEntries(entries);
      } else {
        setBlogEntries([]);
        setMessages(json.message);
      }
      if (info) {
        setBlogInfo(info);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get blog entries.");
    });
};

const Blog = () => {
  const [blogEntries, setBlogEntries] = useState(null);
  const [blogInfo, setBlogInfo] = useState(null);
  const [messages, setMessages] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);

  const onUpdateInfo = (values) => {
    setMessages(null);
    var formData = new FormData();
    formData.append("values", JSON.stringify(values));

    fetch(`http://localhost:4242/api/blog/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
      })
      .catch((err) => {
        setMessages(err.message || "There was a problem.");
      })
      .finally(() => {
        getBlogEntries(setBlogEntries, setMessages, setBlogInfo);
      });
  };

  const onSubmit = (values) => {
    const dateforPost = new Date(values.date);
    const imagesArr = Array.from(values.newImage);
    var formData = new FormData();
    formData.append("entry", JSON.stringify({ ...values, date: convertDate(dateforPost, "iso") }));

    for (var file of imagesArr) {
      formData.append("newImage", file);
    }
    fetch(`http://localhost:4242/api/blog/${values.id}`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getBlogEntries(setBlogEntries, setMessages, setBlogInfo);
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
          getBlogEntries(setBlogEntries, setMessages, setBlogInfo);
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
      getBlogEntries(setBlogEntries, setMessages, setBlogInfo);
    }
  }, [blogEntries, blogInfo, messages, setBlogEntries, setMessages, setBlogInfo]);

  return (
    <PageLayout
      title="Update Yer Blarrgh"
      messages={messages}
      button={{ action: toggleForm, text: "Add a new one", value: "newentry" }}>
      <div className="content">
        {blogInfo && (
          <EditBlogData
            blogInfo={blogInfo}
            onSubmit={onUpdateInfo}
          />
        )}
        {showForm && (
          <EditBlogEntry
            isOpen={showForm}
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
                        src={blog.image}
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
                      <HStack gap={4}>
                        <Button
                          size="sm"
                          variant="shopButt"
                          value={blog.id}
                          onClick={doDelete}>
                          X
                        </Button>
                        <Button
                          size="sm"
                          variant="shopButt"
                          value={blog.id}
                          onClick={toggleForm}>
                          Edit
                        </Button>
                      </HStack>
                    </HStack>
                  ),
              )
            ) : (
              <p className="centered">no blog entries yet</p>
            )}
          </Stack>
        </Box>
      </div>
    </PageLayout>
  );
};
export default Blog;
