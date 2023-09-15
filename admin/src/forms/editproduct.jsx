import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Editable,
  EditableTextarea,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Center,
  Heading,
} from "@chakra-ui/react";
import FloatingFormWrapper from "../bits/floatingformwrap";
import { useFieldArray, useForm } from "react-hook-form";
import { convertDate } from "../bits/datetimebit";

const today = new Date();

const newprodId = "product-id ex: med-blue-widget";
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
};

export default function EditProduct({
  prodId,
  products,
  categories,
  subjects,
  toggleForm,
  onSubmit,
}) {
  const selectedProduct =
    products[products.findIndex((prod) => prod.id === prodId.replace("-copy", ""))] || newproduct;
  if (selectedProduct?.id !== newprodId) {
    const ms = Date.parse(selectedProduct.date);
    const prodAdddate = new Date(ms);
    selectedProduct.date = convertDate(prodAdddate, "input");
  }
  const [wysiwygText, setWysiwygText] = useState(selectedProduct.desc);
  const [wysiwygText2, setWysiwygText2] = useState(selectedProduct.desc_long);
  const [catIds, setCatIds] = useState([]);

  useEffect(() => {
    if (categories) {
      setCatIds(Object.keys(categories));
    }
  }, [categories, setCatIds, subjects]);

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
        <Button
          className="shopButt right"
          onClick={toggleForm}>
          Never mind
        </Button>
      </HStack>
      <FormControl p={4}>
        <HStack>
          <FormLabel w={40}>Id:</FormLabel>
          <Input
            className={errors.id ? "is-invalid" : ""}
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
            className={errors.date ? "is-invalid" : ""}
            type="datetime-local"
            {...register("date", { required: true })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Name:</FormLabel>
          <Input
            className={errors.name ? "is-invalid" : ""}
            type="text"
            {...register("name", { required: true })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack>
          <FormLabel w={40}>Sold Out?:</FormLabel>
          <Checkbox
            colorScheme="green"
            type="checkbox"
            {...register("soldout")}></Checkbox>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Price:</FormLabel>
          <Input
            className={errors.price ? "is-invalid" : ""}
            type="number"
            {...register("price", { required: true, pattern: /^[0-9]{0,4}[.]?[0-9]{0,2}$/ })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Image, Relative URL: /shop/</FormLabel>
          <Input
            className={errors.img ? "is-invalid" : ""}
            type="text"
            {...register("img", { required: true })}
          />
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Alt Images:</FormLabel>
          {fields.map((field, index) => (
            <span key={field.id}>
              <Input
                type="text"
                {...register(`altimgs.${index}`)}
              />
              <Button
                className="shopButt"
                onClick={() => remove(index)}>
                X
              </Button>
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
        <HStack alignItems="center">
          <FormLabel w={40}>Description:</FormLabel>
          <div className="content">
            <Editable
              defaultValue={wysiwygText}
              isPreviewFocusable={true}
              selectAllOnFocus={false}>
              <EditableTextarea
                bg="white"
                border={"1px solid"}
                onChange={handleTextChange("desc")}>
                {wysiwygText}
              </EditableTextarea>
              <EditablePreview />
            </Editable>

            {/* <ReactQuill
            id="wysi_one"
            className={errors.desc ? "is-invalid" : ""}
            theme="bubble"
            value={wysiwygText}
            onChange={handleTextChange("desc")}
          /> */}
          </div>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={40}>Detail:</FormLabel>
          <div className="content">
            <Editable
              defaultValue={wysiwygText2}
              onChange={handleTextChange("desc_long")}>
              <EditableTextarea></EditableTextarea>
            </Editable>
            {/*           <ReactQuill
            id="wysi_two"
            className={errors.desc_long ? "is-invalid" : ""}
            theme="bubble"
          /> */}
          </div>
        </HStack>
      </FormControl>
      <FormControl p={4}>
        <h5>Categories:</h5>
        {catIds.map((c, i) => {
          return (
            <span key={i}>
              <span>
                <Input
                  type="checkbox"
                  {...register(`cat`)}
                  value={c}
                />
                <label htmlFor="cat">{categories[c].name}</label>{" "}
              </span>
              {" • "}
            </span>
          );
        })}
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
          <Input
            className={errors.handling ? "is-invalid" : ""}
            type="number"
            {...register("handling", { pattern: /^[0-9]{0,4}[.]?[0-9]{0,2}$/ })}
          />
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
