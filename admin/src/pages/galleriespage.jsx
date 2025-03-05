import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Select,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import UploadInput from "../bits/upload-input";
import FloatingFormWrapper from "../bits/floatingformwrap";
import GalleryGrid from "../bits/galleryGrid";
import EditGallery from "../forms/galleryeditor";
import PageLayout from "../bits/PageLayout";

const getGalleries = (setGalleries, setMessages) => {
  fetch("http://localhost:4242/api/galleries")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json.galleries)) {
        setGalleries(json.galleries);
      } else {
        setGalleries([]);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get galleries.");
    });
};

const getGallery = async (gallery_id, setter) => {
  fetch(`http://localhost:4242/api/gallery/${gallery_id}`, { cache: "no-cache" })
    .then((data) => data.json())
    .then((json) => {
      const the_images = json;
      const imageKeys = Object.keys(json);
      setter(imageKeys.map((key) => the_images[key]));
    })
    .catch((err) => {
      console.log(err);
    });
};

const Gallery = () => {
  const [messages, setMessages] = useState(null);
  const [galleries, setGalleries] = useState(null);
  const [activeGallery, setActiveGallery] = useState({});
  const [images, setImages] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const selectedImages = watch("images", false);

  const onSelect = (value) => {
    setLoading(true);
    const gallery = galleries.find((g) => g.id === value);
    if (gallery !== undefined) {
      setActiveGallery(gallery);
      setLoading(false);
      getGallery(gallery.id, setImages);
    }
  };

  const toggleShowForm = () => {
    setShowUpload(!showUpload);
  };
  const toggleShowAdd = () => {
    setShowAddEdit(!showAddEdit);
  };

  const doResetGallery = (gallery) => () => {
    fetch(`http://localhost:4242/api/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gallery }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getGallery(activeGallery.id, setImages);
      });
  };

  const onSubmit = (data) => {
    const imagesArr = Array.from(data.images);
    if (!imagesArr.length) return;

    var formData = new FormData();
    formData.append("dest", activeGallery.path);

    for (var file of imagesArr) {
      formData.append("images", file);
    }
    fetch("http://localhost:4242/api/imageupload", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
      })
      .then(() => {
        doResetGallery(activeGallery)();
      })
      .catch(() => {
        setMessages("Failed to upload files.");
      })
      .finally(() => {
        setShowUpload(false);
      });
  };

  const updateImage = (imageurl, date, name) => () => {
    const extention = imageurl.substr(imageurl.lastIndexOf("."));
    const newName = `${date}${name.replaceAll(" ", "")}${extention}`;
    fetch(`http://localhost:4242/api/images/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageurl: imageurl, newname: newName }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
      })
      .then(() => {
        doResetGallery(activeGallery)();
      })
      .catch((err) => {
        setMessages(err.message || "There was a problem.");
      });
  };

  const deleteImage = (imageurl) => () => {
    fetch(`http://localhost:4242/api/images/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageurl: imageurl }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
      })
      .then(() => {
        doResetGallery(activeGallery)();
      })
      .catch((err) => {
        setMessages(err.message || "There was a problem.");
      });
  };

  useEffect(() => {
    if (!galleries && !messages) {
      getGalleries(setGalleries, setMessages);
    }
  }, [galleries, messages]);

  return (
    <PageLayout
      title="Update a Gallery"
      messages={messages}
      button={{
        text: showAddEdit ? "Never mind" : "Add new Gallery",
        action: toggleShowAdd,
        value: "new-gallery",
      }}>
      <Stack className="content">
        {galleries && (
          <Stack textAlign="center">
            <FormControl p={4}>
              <HStack>
                <FormLabel w={40}>Select a gallery:</FormLabel>
                <Select
                  {...register("dest")}
                  placeholder="Select a gallery"
                  onChange={(e) => onSelect(e.target.value)}>
                  {galleries.map((gallery) => (
                    <option
                      key={gallery.id}
                      value={gallery.id}>
                      {gallery.title}
                    </option>
                  ))}
                </Select>
              </HStack>
            </FormControl>

            {!!activeGallery && !loading && (
              <Stack>
                <Heading size="sm">Update Gallery: {activeGallery.title}</Heading>
                <HStack justifyContent="center">
                  <Button onClick={toggleShowForm}>Add Images</Button>
                  <Button onClick={doResetGallery(activeGallery)}>Reset Json File</Button>
                  <Button onClick={toggleShowAdd}>Edit Gallery</Button>
                </HStack>
                <GalleryGrid
                  gallery={activeGallery}
                  images={images}
                  deleteImage={deleteImage}
                  updateImage={updateImage}
                />
              </Stack>
            )}
            <FloatingFormWrapper
              isOpen={showUpload}
              onClose={toggleShowForm}>
              <Stack>
                <HStack justifyContent="space-between">
                  <Heading size="md">
                    Upload Images {!!activeGallery && <span>to {activeGallery.title}</span>}
                  </Heading>
                  <Button onClick={toggleShowForm}>Never mind</Button>
                </HStack>
                {loading ? (
                  <Stack>
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                  </Stack>
                ) : (
                  <>
                    <UploadInput
                      register={register}
                      name="images"
                    />
                    <Button
                      variant="shopButt"
                      disabled={!selectedImages}
                      onClick={handleSubmit(onSubmit)}>
                      Upload and Resize
                    </Button>
                  </>
                )}
              </Stack>
            </FloatingFormWrapper>
            {activeGallery && (
              <EditGallery
                selectedGallery={activeGallery}
                toggleForm={toggleShowAdd}
                isOpen={showAddEdit}
              />
            )}
          </Stack>
        )}
      </Stack>
    </PageLayout>
  );
};
export default Gallery;
