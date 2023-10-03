import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  HStack,
  Center,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { modules, formats } from "../bits/quillbits";
import InfoBubble from "../bits/info-bubble";
import UploadInput from "../bits/upload-input";

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

function HomePageForm({ pageData, onSubmit }) {
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
        <Heading size="md">Edit Site and Home Page</Heading>
      </HStack>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Home Page Title:{" "}
            <InfoBubble message="This is the SEO site title for the home page. It should include the company name and info about what you offer. " />
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
            Company Name:{" "}
            <InfoBubble message="This is the simple, short name of your site or shop. " />
          </FormLabel>
          <Input
            isInvalid={errors.company_name ? true : false}
            errorBorderColor="red.300"
            type="text"
            data-lpignore="true"
            {...register("company_name", { required: true, validate: (value) => value !== "" })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Live Url:{" "}
            <InfoBubble message="You know, that domain name you baught. example: https://www.yoursitename.com " />
          </FormLabel>
          <Input
            isInvalid={errors.live_site_url ? true : false}
            errorBorderColor="red.300"
            type="url"
            data-lpignore="true"
            {...register("live_site_url", {
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Homepage SEO Page Description:{" "}
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
          <FormLabel w={48}>Site Logo:</FormLabel>
          <Box
            flexGrow={3}
            borderWidth={1}
            borderStyle="solid"
            borderRadius={4}
            p={5}>
            <FormControl>
              <HStack alignItems="top">
                <FormLabel w={40}>Upload New Image</FormLabel>
                <UploadInput
                  name="newsitelogo"
                  multiple={false}
                  register={register}
                />
              </HStack>
            </FormControl>
            <FormControl p={4}>
              <HStack alignItems="center">
                <FormLabel w={48}>
                  Or edit image url:{" "}
                  <InfoBubble message="You can edit the image url to be a different image you have uploaded in the past. You can also use an image from a different website. (This value will be overwritten if you select an image to upload.)" />
                </FormLabel>
                <Input
                  isInvalid={errors.sitelogo ? true : false}
                  errorBorderColor="red.300"
                  type="text"
                  {...register("sitelogo")}
                />
                <Image
                  src={`http://localhost:3000/${pageData.sitelogo}`}
                  boxSize="100px"
                  fallbackSrc="http://localhost:3000/images/image-loading.svg"
                />
              </HStack>
            </FormControl>
          </Box>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={48}>Home Page Content:</FormLabel>
          <Box
            flexGrow={3}
            minH={2}
            borderWidth={1}
            borderStyle="solid"
            borderRadius={5}
            className="content">
            <ReactQuill
              id="wysi_one"
              className={errors.page_content ? "is-invalid" : ""}
              theme="snow"
              modules={modules}
              formats={formats}
              value={wysiwygText}
              onChange={handleTextChange("page_content")}
            />
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

export default function HomePage() {
  const [messages, setMessages] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        getSiteData(setPageData, setMessages, setLoading);
      })
      .catch((err) => {
        setMessages(err.message || "There was a problem.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <Heading
        textAlign="center"
        size="md">
        Manage Site Data and Homepage
      </Heading>
      {loading ? (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      ) : (
        <HomePageForm
          pageData={pageData}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
