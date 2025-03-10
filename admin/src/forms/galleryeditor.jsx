import { useState } from "react";
import InfoBubble from "../bits/info-bubble";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Heading,
} from "@chakra-ui/react";
import FloatingFormWrapper from "../bits/floatingformwrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { modules, formats } from "../bits/quillbits";
import { newGalleryId } from "../pages/galleriespage";

export default function EditGallery({ selectedGallery, isOpen, toggleForm }) {
  const [wysiwygText, setWysiwygText] = useState(selectedGallery.content);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: selectedGallery, mode: "onChange" });

  const handleTextChange = () => (newText) => {
    setValue("content", newText);
    setWysiwygText(newText);
  };
  const onSubmit = (data) => {
    fetch("http://localhost:4242/api/galleries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gallery: data }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          toggleForm();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FloatingFormWrapper
      isOpen={isOpen}
      onClose={toggleForm}>
      <Box size="xl">
        <Flex justifyContent="space-between">
          <Heading size="md">Add/Edit Gallery Information</Heading>
          <Button onClick={toggleForm}>Never mind</Button>
        </Flex>
        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>
              Id:
              <InfoBubble
                message={`Gallery Id is used in the URL and should be descriptive. Ex: "papercraft"`}
              />
            </FormLabel>
            <Input
              isInvalid={errors.id ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("id", { required: true, validate: (value) => value !== newGalleryId })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>Title:</FormLabel>
            <Input
              isInvalid={errors.title ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("title", { required: true })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>
              Path to Image Files:
              <InfoBubble message={`Relative to /public/`} />
            </FormLabel>
            <Input
              isInvalid={errors.path ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("path", { required: true })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>
              Path to Images Json File: <InfoBubble message={`Relative to public/data/`} />
            </FormLabel>
            <Input
              placeholder="data/{galleryKey}.json"
              isInvalid={errors.json_path ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("json_path", { required: true })}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack alignItems="top">
            <FormLabel w={48}>Gallery Description Content:</FormLabel>
            <Box
              flexGrow={3}
              minH={2}
              borderWidth={1}
              borderStyle="solid"
              borderRadius={5}
              className="content">
              <ReactQuill
                id="gallery"
                className={errors.content ? "is-invalid" : "topbox"}
                theme="snow"
                modules={modules}
                formats={formats}
                value={wysiwygText}
                onChange={handleTextChange("content")}
              />
            </Box>
          </HStack>
        </FormControl>

        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>
              Id of related Product: <InfoBubble message={`Optional, mostly for comics.`} />
            </FormLabel>
            <Input
              errorBorderColor="red.300"
              type="text"
              {...register("linked_prod")}
            />
          </HStack>
        </FormControl>
        <FormControl p={4}>
          <HStack>
            <FormLabel w={40}>
              Sort Old to new: <InfoBubble message={`Optional, mostly for comic stories.`} />
            </FormLabel>
            <Checkbox
              type="text"
              {...register("isStory")}
            />
          </HStack>
        </FormControl>
        <Center>
          <Button
            variant="shopButt"
            colorScheme="orange"
            onClick={handleSubmit(onSubmit)}>
            Submit Changes
          </Button>
        </Center>
      </Box>
    </FloatingFormWrapper>
  );
}
