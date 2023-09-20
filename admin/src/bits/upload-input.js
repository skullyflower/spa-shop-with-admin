import { useState } from "react";
import { Box, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";

function Preview({ data }) {
  return (
    <div>
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
    </div>
  );
}

export default function UploadInput({ name, register }) {
  const [previewImages, setPreviewImages] = useState([]);

  const addMultipleImages = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="newImage">Upload Images</FormLabel>
        <Input
          {...register(name)}
          type="file"
          accept="image/*"
          multiple
          name={name}
          onChange={addMultipleImages}
        />
      </FormControl>
      {previewImages.length > 0 && <Preview data={previewImages} />}
    </Box>
  );
}
