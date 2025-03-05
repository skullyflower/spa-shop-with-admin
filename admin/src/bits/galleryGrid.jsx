import React from "react";
import { GalleryGridImage } from "../forms/GalleryGridImage";
import { Flex } from "@chakra-ui/react";

const isBigger = () => {
  let bigger = false;
  if (window.innerWidth > 700) {
    bigger = true;
  }
  return bigger;
};

const GalleryGrid = ({ gallery, images, deleteImage, updateImage }) => {
  const dir = gallery.path;
  const bigger = isBigger();
  const imgDir = `http://localhost:3000/${dir}`;

  if (images?.length > 0) {
    return (
      <Flex wrap="wrap">
        {images.map((oneImage) => (
          <GalleryGridImage
            key={oneImage.imgfile}
            imgDir={imgDir}
            oneImage={oneImage}
            bigger={bigger}
            deleteImage={deleteImage}
            updateImage={updateImage}
          />
        ))}
      </Flex>
    );
  }
  return null;
};
export default GalleryGrid;
