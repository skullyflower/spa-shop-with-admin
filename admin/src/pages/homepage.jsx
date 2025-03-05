import { useEffect, useState } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";
import PageLayout from "../bits/PageLayout";
import HomePageForm from "../forms/homepageForm";
import HomePagePreview from "../forms/homepagePreview";

const getSiteData = (setLoading, setMessages, setPageData) => {
  setLoading(true);
  fetch("http://localhost:4242/api/home")
    .then((data) => data.json())
    .then((json) => {
      setPageData(json);
      setLoading(false);
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get page data.");
    })
    .finally(() => {
      setLoading(false);
    });
};

export default function HomePage() {
  const [messages, setMessages] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!pageData && !messages) {
      getSiteData(setLoading, setMessages, setPageData);
    }
  }, [pageData, messages]);

  const onSubmit = (values) => {
    setMessages(null);
    setLoading(true);
    const imagesArr = Array.from(values.newsitelogo);
    //const contentimages = Array.from(values.)
    var formData = new FormData();
    formData.append("values", JSON.stringify(values));

    for (var file of imagesArr) {
      formData.append("newsitelogo", file);
    }
    fetch("http://localhost:4242/api/home", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
      })
      .catch((err) => {
        setMessages(err.message || "There was a problem.");
      })
      .finally(() => {
        getSiteData(setLoading, setMessages, setPageData);
      });
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <PageLayout
      title="Manage Site Data and Homepage"
      messages={messages}
      button={{ text: showForm ? "Show Preview" : "Show Form", action: toggleForm, value: "" }}>
      {loading ? (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      ) : showForm ? (
        <HomePageForm
          pageData={pageData}
          onSubmit={onSubmit}
        />
      ) : (
        <HomePagePreview pageData={pageData} />
      )}
    </PageLayout>
  );
}
