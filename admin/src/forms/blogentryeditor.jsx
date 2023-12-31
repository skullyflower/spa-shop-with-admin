import { useState } from "react";
import ReactQuill from "react-quill";
import { modules } from "../bits/quillbits";
import { useForm } from "react-hook-form";
import { convertDate } from "../bits/datetimebit";
import UploadInput from "../bits/upload-input";
import InfoBubble from "../bits/info-bubble";
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
  Stack,
} from "@chakra-ui/react";
import FloatingFormWrapper from "../bits/floatingformwrap";

/* const getSiteData = (setLoading, setMessages, setPageData) => {
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
}; */

const today = new Date();

const newblog = {
  id: convertDate(today, "id"),
  date: convertDate(today, "input"),
  title: "",
  imagelink: "",
  image: "",
  imagealt: "",
  imgcaption: "",
  heading: "",
  text: "",
  newImage: [],
};

const EditBlogEntry = ({ blogid, blogEntries, toggleForm, onSubmit }) => {
  const thisEntry = blogEntries.find((blog) => blog.id === blogid) || newblog;
  const [wysiwygText, setWysiwygText] = useState(thisEntry.text);

  if (blogid !== "newentry" && thisEntry) {
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

  const handleTextChange = () => (newText) => {
    setValue("text", newText);
    setWysiwygText(newText);
  };

  return (
    <FloatingFormWrapper>
      <Stack justifyContent="space-between">
        <HStack
          w="100%"
          justifyContent="space-between">
          <Heading
            textAlign="center"
            size="md">
            Add/Edit Blog Entries
          </Heading>
          <Button onClick={toggleForm}>Never mind</Button>
        </HStack>
        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>
              <InfoBubble message={`Blog ids are based on the date"`} />
            </FormLabel>
            <Input
              isInvalid={errors.id ? true : false}
              errorBorderColor="red.300"
              type="text"
              data-lpignore="true"
              {...register("id")}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="center">
            <FormLabel w={40}>Date:</FormLabel>
            <Input
              isInvalid={errors.date ? true : false}
              errorBorderColor="red.300"
              type="datetime-local"
              {...register("date", { required: true })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="center">
            <FormLabel w={40}>Entry Title:</FormLabel>
            <Input
              isInvalid={errors.title ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("title", { required: true })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="top">
            <FormLabel w={40}>Blog Image:</FormLabel>
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
                    name="newImage"
                    multiple={false}
                    register={register}
                  />
                </HStack>
              </FormControl>
              <FormControl p={4}>
                <HStack alignItems="center">
                  <FormLabel w={40}>
                    Or edit image url:{" "}
                    <InfoBubble message=" (This value will be overwritten if you select a new image to upload.)" />
                  </FormLabel>
                  <Input
                    isInvalid={errors.image ? true : false}
                    errorBorderColor="red.300"
                    type="text"
                    {...register("image")}
                  />
                  <Image
                    src={`http://localhost:3000${thisEntry.image}`}
                    boxSize="100px"
                    fallbackSrc="http://localhost:3000/images/image-loading.svg"
                  />
                </HStack>
              </FormControl>
            </Box>
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="center">
            <FormLabel w={40}>Alt Text:</FormLabel>
            <Input
              isInvalid={errors.imagealt ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("imagealt")}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="center">
            <FormLabel w={40}>Content Link:</FormLabel>
            <Input
              className={errors.imagelink ? "is-invalid" : ""}
              type="url"
              {...register("imagelink")}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="center">
            <FormLabel w={40}>Image Caption:</FormLabel>
            <Input
              className={errors.imgcaption ? "is-invalid" : ""}
              type="text"
              {...register("imgcaption")}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="center">
            <FormLabel w={40}>Heading:</FormLabel>
            <Input
              className={errors.heading ? "is-invalid" : ""}
              type="text"
              {...register("heading", { required: true })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="top">
            <FormLabel w={40}>Blog Content:</FormLabel>
            <Box
              minW="80%"
              minH={2}
              border="1px solid gray"
              borderRadius={5}
              className="content">
              <ReactQuill
                id="wysi_one"
                isInvalid={errors.text ? true : false}
                errorBorderColor="red.300"
                theme="snow"
                modules={modules}
                value={wysiwygText}
                onChange={handleTextChange("text")}
              />
            </Box>
          </HStack>
        </FormControl>
        <div>
          <label>Tags</label>
          TODO: add tags for filtering.
        </div>
        <Center>
          <Button
            colorScheme="orange"
            onClick={handleSubmit(onSubmit)}>
            Submit Changes
          </Button>
        </Center>
      </Stack>
    </FloatingFormWrapper>
  );
};
export default EditBlogEntry;
