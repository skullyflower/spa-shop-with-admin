import { useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import FloatingFormWrapper from "../bits/floatingformwrap";
import { modules, formats } from "../bits/quillbits";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Center,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

import "react-quill/dist/quill.bubble.css";

const newcat = { id: "newcat", name: "", img: "", description: "", subcat: [] };

export default function EditCategory({ catid, categories, toggleCatForm, onSubmit }) {
  const cat = categories[categories.findIndex((cat) => cat.id === catid)] || newcat;
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
    <FloatingFormWrapper>
      <HStack justifyContent="space-between">
        <Heading size="md">Add/Edit Product Categories</Heading>
        <Button onClick={toggleCatForm}>Never mind</Button>
      </HStack>
      <FormControl p={4}>
        <HStack>
          <FormLabel w={40}>
            Id:
            <Popover trigger="hover">
              <PopoverTrigger>
                <button>(?)</button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  Categor ids must be unique, and should be descriptive. Ex: "widgets"
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </FormLabel>
          <Input
            className={errors.id ? "is-invalid" : ""}
            type="text"
            data-lpignore="true"
            {...register("id", { required: true, validate: (value) => value !== "newcat" })}
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
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Category Image:</FormLabel>
          <InputGroup>
            <InputLeftAddon children={`/shop/group/${cat.id}/`} />
            <Input
              isInvalid={errors.img ? true : false}
              errorBorderColor="red.300"
              type="text"
              {...register("img", { required: true })}
            />
          </InputGroup>
          <Image
            src={cat.img}
            boxSize="100px"
            fallbackSrc="http://localhost:3000/images/image-loading.svg"
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={40}>Description:</FormLabel>
          <Box
            minW="80%"
            minH={2}
            border="1px solid gray"
            borderRadius={5}
            className="content">
            <ReactQuill
              id="wysi_one"
              className={errors.description ? "is-invalid" : ""}
              theme="snow"
              modules={modules}
              formats={formats}
              value={wysiwygText}
              onChange={handleTextChange("description")}
            />
          </Box>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={40}>
            Sub-Categories:{" "}
            <Popover trigger="hover">
              <PopoverTrigger>
                <button>(?)</button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  Do not select anything here unless you want to make this category a container for
                  other categories.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </FormLabel>
          <HStack
            width="80%"
            borderWidth={1}
            borderStyle="solid"
            p={5}
            borderRadius={5}>
            {categories.map((c) => {
              return (
                <span key={c.id}>
                  <span>
                    <Checkbox
                      {...register(`subcat`)}
                      value={c.id}>
                      {c.id}
                    </Checkbox>
                  </span>
                </span>
              );
            })}
          </HStack>
        </HStack>
      </FormControl>
      <Center>
        <Button
          className="shopButt"
          onClick={handleSubmit(onSubmit)}>
          Submit Changes
        </Button>
      </Center>
    </FloatingFormWrapper>
  );
}
