import { useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import FloatingFormWrapper from "../bits/floatingformwrap";
import { modules } from "../bits/quillbits";
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

import "react-quill/dist/quill.bubble.css";

const newcat = { id: "", name: "", img: "", description: "", subcat: [], newImage: [] };

export default function EditSubject({ catid, subjects, isOpen, toggleCatForm, onSubmit }) {
  const cat = subjects[subjects?.findIndex((cat) => cat.id === catid)] || newcat;
  const [wysiwygText, setWysiwygText] = useState(cat.description);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: cat, mode: "onChange" });

  const handleTextChange = (formfield) => (newText) => {
    setValue(formfield, newText);
    setWysiwygText(newText);
  };

  return (
    <FloatingFormWrapper
      isOpen={isOpen}
      onClose={toggleCatForm}>
      <HStack justifyContent="space-between">
        <Heading size="md">Add/Edit Product Subjects</Heading>
        <Button onClick={toggleCatForm}>Never mind</Button>
      </HStack>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>
            Id:{" "}
            <InfoBubble message='Ids must be unique, and should be descriptive. Example: "widgets"' />
          </FormLabel>
          <Input
            isInvalid={errors.id ? true : false}
            errorBorderColor="red.300"
            type="text"
            {...register("id", { required: true, validate: (value) => value !== "" })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Category Name:</FormLabel>
          <Input
            isInvalid={errors.name ? true : false}
            errorBorderColor="red.300"
            type="text"
            {...register("name", { required: true })}
          />
        </HStack>
      </FormControl>
      {/* <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={40}>Category Image:</FormLabel>
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
                  <InfoBubble message="You can edit the image url to be a different image you have uploaded in the past. You can also use an image from a different website. (This value will be overwritten if you select an image to upload.)" />
                </FormLabel>
                <Input
                  isInvalid={errors.img ? true : false}
                  errorBorderColor="red.300"
                  type="text"
                  {...register("img")}
                />
                <Image
                  src={`http://localhost:3000${cat.img}`}
                  boxSize="100px"
                  fallbackSrc="http://localhost:3000/images/image-loading.svg"
                />
              </HStack>
            </FormControl>
          </Box>
        </HStack>
      </FormControl> */}
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={40}>Description:</FormLabel>
          <Box
            flexGrow={3}
            minH={2}
            borderWidth={1}
            borderStyle="solid"
            borderRadius={5}
            className="content">
            <ReactQuill
              id="wysi_one"
              className={errors.description ? "is-invalid" : ""}
              theme="snow"
              modules={modules}
              value={wysiwygText}
              onChange={handleTextChange("description")}
            />
          </Box>
        </HStack>
      </FormControl>
      <Center>
        <Button
          variant="shopButt"
          onClick={handleSubmit(onSubmit)}>
          Submit Changes
        </Button>
      </Center>
    </FloatingFormWrapper>
  );
}
