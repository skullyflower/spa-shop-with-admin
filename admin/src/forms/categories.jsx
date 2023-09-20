import { useCallback, useEffect, useState } from "react";
import { Box, Button, Center, HStack, Heading, Image } from "@chakra-ui/react";

import EditCategory from "./categoryeditor";
import "react-quill/dist/quill.bubble.css";

const getCategories = (setCategories, setMessages) => {
  setCategories([]);
  fetch("http://localhost:4242/api/categories")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setCategories(json);
      } else {
        setCategories([]);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get categories.");
    });
};

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [messages, setMessages] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const onSubmit = (values) => {
    const imagesArr = Array.from(values.newImage);
    var formData = new FormData();
    formData.append("category", JSON.stringify(values));

    formData.append("date", Date.now().toString());
    for (var file of imagesArr) {
      formData.append("newImage", file);
    }

    fetch("http://localhost:4242/api/categories", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getCategories(setCategories, setMessages);
        toggleCatForm();
      })
      .catch((err) => {
        setMessages(err.message || "there was a problem.");
      });
  };
  const doDelete = useCallback((e) => {
    if (window.confirm("Are you sure you want to do this?")) {
      const category = e.target.value;
      fetch(`http://localhost:4242/api/categories/${category}`, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((json) => {
          setMessages(json.message);
          getCategories(setCategories, setMessages);
        });
    }
  }, []);

  const toggleCatForm = useCallback(
    (e) => {
      const category = e && e.target.value ? e.target.value : null;
      setActiveCat(category);
      setShowCatForm(!!category);
    },
    [setActiveCat, setShowCatForm],
  );
  useEffect(() => {
    if (!categories && !messages) {
      getCategories(setCategories, setMessages);
    }
  }, [categories, messages, setCategories, setMessages]);

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <Heading
        textAlign="center"
        size="md">
        Add, Update, Delete Categories
      </Heading>
      {showCatForm && (
        <div>
          <EditCategory
            catid={activeCat}
            categories={categories}
            toggleCatForm={toggleCatForm}
            onSubmit={onSubmit}
          />
        </div>
      )}
      <Box p={5}>
        {categories?.map((cat) => (
          <HStack
            key={cat.id}
            p={5}
            m={5}
            border="1px solid"
            borderRadius={5}
            w="100%"
            alignItems="flex-start"
            justifyContent="space-between">
            <Image
              src={`http://localhost:3000${cat.img}`}
              boxSize="100px"
              alt={cat.name}
              fallbackSrc="http://localhost:3000/images/image-loading.svg"
            />
            <Heading size="sm">{cat.name}</Heading>
            <div
              style={{
                textAlign: "left",
                display: "inline-block",
                width: "60%",
                verticalAlign: "top",
              }}
              dangerouslySetInnerHTML={{ __html: cat.description }}
            />
            <button
              className="shopButt"
              value={cat.id}
              onClick={doDelete}>
              X
            </button>
            <Button
              size="sm"
              value={cat.id}
              onClick={toggleCatForm}>
              Edit
            </Button>
          </HStack>
        ))}
        <Center>
          <Button
            className="shopButt"
            value="newcat"
            onClick={toggleCatForm}>
            {showCatForm ? "Never mind" : "Add a new one"}
          </Button>
        </Center>
      </Box>
    </div>
  );
};
export default Categories;
