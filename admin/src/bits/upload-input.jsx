import { useState } from "react";
import { Box, CloseButton, HStack, Image, Input } from "@chakra-ui/react";

function Preview({ images, updateImages }) {
  const deleteImage = (image) => {
    updateImages(images.filter((img) => img !== image));
  };
  return (
    <>
      {images.map((image, i) => (
        <HStack align={"start"}>
          <Image
            className="image"
            src={image}
            alt=""
            key={`${image}${i}`}
            width={150}
            style={{ padding: "10px" }}
          />
          <CloseButton
            size={"sm"}
            onClick={() => deleteImage(image)}
          />
        </HStack>
      ))}
    </>
  );
}

export default function UploadInput({ name, register, setImageCount, multiple = true }) {
  const [previewImages, setPreviewImages] = useState([]);

  const addMultipleImages = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      if (!multiple) {
        setPreviewImages([]);
      }
      setPreviewImages(imageArray);
      if (setImageCount) {
        setImageCount(imageArray.length);
      }
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
        width={350}
        height={previewImages?.length > 0 ? 50 : 150}
        paddingTop={previewImages?.length > 0 ? 2 : 10}
        paddingLeft={10}
        backgroundImage={"/images/image-loading.svg"}
        borderColor={"slate.800"}
        borderWidth={2}
        borderStyle={"solid"}
        _before={
          previewImages?.length > 0 && {
            content: '"Remove and Select New"',
            display: "block",
            lineHeight: 2,
            fontWeight: 700,
          }
        }
      />
      <HStack>
        {previewImages?.length > 0 && (
          <Preview
            images={previewImages}
            updateImages={setPreviewImages}
          />
        )}
      </HStack>
    </Box>
  );
}
