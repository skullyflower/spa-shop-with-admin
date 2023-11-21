import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Center,
  Heading,
  Skeleton,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import InfoBubble from "../bits/info-bubble";

const getPageData = (page, setLoading, setMessages, setPageData) => {
  setLoading(true);
  fetch(`http://localhost:4242/api/pages/${page}`)
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

function PageForm({ page, pageData, onSubmit }) {
  const [wysiwygText, setWysiwygText] = useState(pageData.page_content);
  const {
    register,
    handleSubmit,
    formState: { errors, reset },
    setValue,
  } = useForm({ defaultValues: pageData, mode: "onChange" });

  const handleTextChange = (formfield) => (newText) => {
    setValue(formfield, newText);
    setWysiwygText(newText);
  };

  return (
    <Box p={5}>
      <HStack justifyContent="space-between">
        <Heading size="md">Edit Page {page}</Heading>
      </HStack>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Page Title:{" "}
            <InfoBubble
              message={`This is the SEO page title for the home ${page}. It should include the company name and info about what you offer. `}
            />
          </FormLabel>
          <Input
            isInvalid={errors.page_title ? true : false}
            errorBorderColor="red.300"
            type="text"
            data-lpignore="true"
            {...register("page_title", { required: true, validate: (value) => value !== "" })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            {page} SEO Page Description:{" "}
            <InfoBubble message="Short description that will show in Google searches. " />
          </FormLabel>
          <Input
            isInvalid={errors.page_description ? true : false}
            errorBorderColor="red.300"
            type="text"
            data-lpignore="true"
            {...register("page_description", {
              required: true,
              validate: (value) => value !== "" && value.length <= 500,
            })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={48}>Page Content:</FormLabel>
          <Box
            flexGrow={3}
            minH={2}
            borderWidth={1}
            borderStyle="solid"
            borderRadius={5}
            className="content">
            <Textarea
              {...register("page_content")}
              onBlur={handleTextChange}>
              {wysiwygText}
            </Textarea>
          </Box>
        </HStack>
      </FormControl>
      <Center>
        <HStack gap={4}>
          <Button onClick={reset}>Never mind</Button>
          <Button
            className="shopButt"
            onClick={handleSubmit(onSubmit)}>
            Submit Changes
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}

export default function PageContent() {
  const page = "about";
  const [messages, setMessages] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageData && !messages) {
      getPageData(page, setLoading, setMessages, setPageData);
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
    fetch(`http://localhost:4242/api/pages/${page}`, {
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
        getPageData(setLoading, setMessages, setPageData);
      });
  };

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <Heading
        textAlign="center"
        size="md">
        Manage {page} page
      </Heading>
      {loading ? (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      ) : (
        <PageForm
          page={page}
          pageData={pageData}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
