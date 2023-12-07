import { useEffect, useState } from "react";
import UploadInput from "../bits/upload-input";
import InfoBubble from "../bits/info-bubble";
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
} from "@chakra-ui/react";
import FloatingFormWrapper from "../bits/floatingformwrap";
import { useFieldArray, useForm } from "react-hook-form";
import { convertDate } from "../bits/datetimebit";
import ReactQuill from "react-quill";
import { modules } from "../bits/quillbits";
const today = new Date();

const newprodId = "new-prod-id";
const newproduct = {
  id: newprodId,
  date: convertDate(today, "input"), // default to current date
  name: "",
  price: 0,
  img: "",
  altimgs: [],
  desc: "",
  desc_long: "",
  cat: [],
  weight: 0,
  handling: 0,
  newImage: [],
};

export default function EditProduct({ prodId, products, categories, toggleForm, onSubmit }) {
  const selectedProduct =
    products.find((prod) => prod.id === prodId.replace("-copy", "")) || newproduct;
  if (selectedProduct?.id !== newprodId) {
    const ms = Date.parse(selectedProduct.date);
    const prodAdddate = new Date(ms);
    selectedProduct.date = convertDate(prodAdddate, "input");
  }
  const [wysiwygText, setWysiwygText] = useState(selectedProduct.desc);
  const [wysiwygText2, setWysiwygText2] = useState(selectedProduct.desc_long);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: selectedProduct, mode: "onChange" });

  const { fields, append, remove } = useFieldArray({ control, name: "altimgs" });

  const handleTextChange = (formfield) => (newText) => {
    setValue(formfield, newText);
    if (formfield === "desc") {
      setWysiwygText(newText);
    } else {
      setWysiwygText2(newText);
    }
  };

  useEffect(() => {
    if (prodId?.endsWith("-copy")) {
      setValue("id", prodId);
      const today = new Date();
      setValue("date", convertDate(today, "input"));
    }
  }, [prodId, setValue]);

  return (
    <FloatingFormWrapper>
      <HStack justifyContent="space-between">
        <Heading size="md">Add/Edit Product</Heading>
        <Button onClick={toggleForm}>Never mind</Button>
      </HStack>
      <FormControl p={4}>
        <HStack>
          <FormLabel w={40}>
            Id:
            <InfoBubble
              message={`Product ids must be unique, and should be descriptive. Ex: "med-blue-widget"`}
            />
          </FormLabel>
          <Input
            isInvalid={errors.id ? true : false}
            errorBorderColor="red.300"
            type="text"
            data-lpignore="true"
            {...register("id", { required: true, validate: (value) => value !== newprodId })}
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
          <FormLabel w={40}>Product Name:</FormLabel>
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
          <FormLabel w={40}>Price:</FormLabel>
          <InputGroup>
            <InputLeftAddon children="$" />
            <Input
              isInvalid={errors.price ? true : false}
              errorBorderColor="red.300"
              type="number"
              {...register("price", { required: true, pattern: /^[0-9]{0,4}[.]?[0-9]{0,2}$/ })}
            />
          </InputGroup>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={40}>Product Image:</FormLabel>
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
                  src={`http://localhost:3000${selectedProduct.img}`}
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
          <FormLabel w={40}>Alt Images:</FormLabel>
          {fields.map((field, index) => (
            <span key={field.id}>
              <InputGroup>
                <Input
                  type="text"
                  {...register(`altimgs.${index}`)}
                />
                <Button
                  className="shopButt"
                  onClick={() => remove(index)}>
                  X
                </Button>
              </InputGroup>
            </span>
          ))}
          <div>
            <Button
              className="shopButt"
              onClick={() => append("")}>
              Add
            </Button>
          </div>
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
              isInvalid={errors.desc ? true : false}
              errorBorderColor="red.300"
              theme="snow"
              modules={modules}
              value={wysiwygText}
              onChange={handleTextChange("desc")}
            />
          </Box>
        </HStack>
      </FormControl>
      <FormControl
        p={4}
        isInvalid={errors.desc_long ? true : false}
        errorBorderColor="red.300">
        <HStack alignItems="top">
          <FormLabel w={40}>Detail:</FormLabel>
          <Box
            minW="80%"
            minH={2}
            border="1px solid gray"
            borderRadius={5}
            className="content">
            <ReactQuill
              id="wysi_two"
              value={wysiwygText2}
              theme="snow"
              modules={modules}
              onChange={handleTextChange("desc_long")}
            />
          </Box>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={40}>Categories:</FormLabel>
          <HStack
            width="80%"
            borderWidth={1}
            borderStyle="solid"
            p={5}
            borderRadius={5}>
            {categories?.map((c) => {
              return (
                <span key={c.id}>
                  <span>
                    <Checkbox
                      {...register(`cat`)}
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
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Weight (oz):</FormLabel>
          <Input
            className={errors.weight ? "is-invalid" : ""}
            type="number"
            {...register("weight", { pattern: /^[0-9]{0,4}[.]?[0-9]{0,2}$/ })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Extra Handling:</FormLabel>
          <InputGroup>
            <InputLeftAddon children="$" />
            <Input
              className={errors.handling ? "is-invalid" : ""}
              type="number"
              {...register("handling", { pattern: /^[0-9]{0,4}[.]?[0-9]{0,2}$/ })}
            />
          </InputGroup>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack>
          <FormLabel w={40}>Sold Out?:</FormLabel>
          <Checkbox
            colorScheme="gray"
            {...register("soldout")}></Checkbox>
        </HStack>
      </FormControl>
      <Center>
        <Button
          className="shopButt"
          colorScheme="orange"
          onClick={handleSubmit(onSubmit)}>
          Submit Changes
        </Button>
      </Center>
    </FloatingFormWrapper>
  );
}
