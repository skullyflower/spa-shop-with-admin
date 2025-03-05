import { useState } from "react";
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
  //Select,
  Textarea,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { modules, formats } from "../bits/quillbits";
import InfoBubble from "../bits/info-bubble";
import UploadInput from "../bits/upload-input";

function HomePageForm({ pageData, onSubmit }) {
  const [wysiwygText, setWysiwygText] = useState(pageData?.page_content);
  // const [showNewTheme, setShowNewTheme] = useState(false);
  // const [newTheme, setNewTheme] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, reset },
    setValue,
  } = useForm({ defaultValues: pageData, mode: "onChange" });

  const handleTextChange = (formfield) => (newText) => {
    setValue(formfield, newText);
    // if (formfield === "site_theme") {
    //   setNewTheme(newText);
    // } else {
    setWysiwygText(newText);
    // }
  };

  return (
    <Box p={5}>
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
            {...register("page_title", { required: true, validate: (value) => value !== "" })}
          />
        </HStack>
      </FormControl>
      <HStack>
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
              {...register("live_site_url", {
                required: true,
                validate: (value) => value !== "",
              })}
            />
          </HStack>
        </FormControl>
      </HStack>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Homepage SEO Page Description:{" "}
            <InfoBubble message="Short description that will show in Google searches. " />
          </FormLabel>
          <Textarea
            isInvalid={errors.page_description ? true : false}
            errorBorderColor="red.300"
            type="text"
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
      {/* <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>Default Theme: </FormLabel>
          {showNewTheme ? (
            <Input
              isInvalid={errors.site_them ? true : false}
              errorBorderColor="red.300"
              value={newTheme}
            />
          ) : (
            <Select
              placeholder="Select Theme"
              isInvalid={errors.site_them ? true : false}
              errorBorderColor="red.300"
              {...register("site_theme")}>
              <option value="skullyflower">SkullyFlower</option>
              <option value="halloween">Halloween</option>
              <option
                value=""
                onSelect={() => {
                  setShowNewTheme(true);
                }}>
                Add a New One
              </option>
            </Select>
          )}
        </HStack>
      </FormControl> */}
      <FormControl p={4}>
        <HStack alignItems="top">
          <FormLabel w={48}>Home Page Top Content:</FormLabel>
          <Box
            flexGrow={3}
            minH={2}
            borderWidth={1}
            borderStyle="solid"
            borderRadius={5}
            className="content">
            <ReactQuill
              id="homepage"
              className={errors.page_content ? "is-invalid" : "topbox"}
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
          <Button
            variant="shopButt"
            onClick={reset}>
            Never mind
          </Button>
          <Button
            variant="shopButt"
            onClick={handleSubmit(onSubmit)}>
            Submit Changes
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}
export default HomePageForm;
