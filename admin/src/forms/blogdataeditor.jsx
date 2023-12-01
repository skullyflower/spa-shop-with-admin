import { useState } from "react";
import ReactQuill from "react-quill";
import { modules, formats } from "../bits/quillbits";
import { useForm } from "react-hook-form";
import InfoBubble from "../bits/info-bubble";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Center,
  Heading,
} from "@chakra-ui/react";

const EditBlogData = ({ blogInfo, onSubmit }) => {
  const { page_content } = blogInfo;
  const [wysiwygText, setWysiwygText] = useState(page_content);

  const {
    register,
    handleSubmit,
    formState: { errors, reset },
    setValue,
  } = useForm({ defaultValues: blogInfo, mode: "onChange" });

  const handleTextChange = () => (newText) => {
    setValue("page_content", newText);
    setWysiwygText(newText);
  };

  return (
    <Box p={5}>
      <HStack justifyContent="space-between">
        <Heading size="md">Edit Blog Information</Heading>
      </HStack>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Page Title: <InfoBubble message={`This is the SEO page title for the blog page.`} />
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
            Blog SEO Page Description:{" "}
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
          <FormLabel w={40}>Blog page Content:</FormLabel>
          <Box
            minW="80%"
            minH={2}
            border="1px solid gray"
            borderRadius={5}
            className="content">
            <ReactQuill
              id="wysi_one"
              isInvalid={errors.page_content ? true : false}
              errorBorderColor="red.300"
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
};
export default EditBlogData;
