import { useState } from "react";
import { Box, HStack, Image, Input } from "@chakra-ui/react";

function Preview({ data }) {
  return (
    <>
      {data.map((image) => (
        <Image
          className="image"
          src={image}
          alt=""
          key={image}
          width={150}
          style={{ padding: "10px" }}
        />
      ))}
    </>
  );
}

export default function UploadInput({ name, register, multiple = true }) {
  const [previewImages, setPreviewImages] = useState([]);

  const addMultipleImages = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      if (!multiple) {
        setPreviewImages([]);
      }
      setPreviewImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  return (
    <Box>
      <Input
        {...register(name)}
        type="file"
        accept="image/*"
        multiple={multiple}
        name={name}
        onChange={addMultipleImages}
      />
      <HStack>{previewImages.length > 0 && <Preview data={previewImages} />}</HStack>
    </Box>
  );
}
