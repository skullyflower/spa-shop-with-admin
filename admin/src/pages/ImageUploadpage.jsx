import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../forms/image-upload";
import {
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Image,
  Select,
  VStack,
} from "@chakra-ui/react";
import PageLayout from "../bits/PageLayout";

const getImages = (setFilesToMove, setMessages) => {
  setFilesToMove([]);
  fetch("http://localhost:4242/api/images")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setFilesToMove(json);
      } else {
        setFilesToMove([]);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get images.");
    });
};

const getSubdirectories = (toplevel, setSecondLevel, setMessages) => {
  fetch(`http://localhost:4242/api/folders/${toplevel}`)
    .then((data) => data.json())
    .then((json) => setSecondLevel(json))
    .catch((err) => {
      setMessages(err.message || "Couldn't get subdiractories.");
    });
};
const defaultValues = { toplevel: "", filesToMove: [], secondLevels: "" };

const Images = () => {
  const { register, handleSubmit } = useForm(defaultValues);

  const onSubmit = (values) => {
    fetch("http://localhost:4242/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getImages(setFilesToMove, () => {});
      })
      .catch((err) => {
        setMessages(err.message || "Failed to move files.");
      });
  };

  const [showForm, setShowForm] = useState(false);
  const [filesToMove, setFilesToMove] = useState(null);
  const [messages, setMessages] = useState(null);
  const toplevels = ["artwork", "sfcomics", "images", "shop", "sketches"];
  const [secondLevel, setSecondLevel] = useState([]);

  const checkForImages = useCallback(
    (e) => {
      e?.preventDefault();
      setMessages(null);
      getImages(setFilesToMove, setMessages);
    },
    [setFilesToMove, setMessages],
  );

  useEffect(() => {
    if (!filesToMove && !messages) {
      getImages(setFilesToMove, setMessages);
    }
  }, [filesToMove, setFilesToMove, messages, setMessages]);

  const onSelectDir = useCallback(
    (e) => {
      const dir = e.target.value;
      getSubdirectories(dir, setSecondLevel, setMessages);
    },
    [setSecondLevel, setMessages],
  );

  const doDelete = (imageurl) => () => {
    fetch(`http://localhost:4242/api/images/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageurl: imageurl }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        checkForImages();
      })
      .catch((err) => {
        setMessages(err.message || "There was a problem.");
      });
  };

  return (
    <PageLayout
      messages={messages}
      title="Add Images"
      button={{ action: () => setShowForm(!showForm), text: "Add new ones", value: "newcat" }}>
      {showForm && (
        <ImageUpload
          isOpen={showForm}
          hideForm={() => {
            setShowForm(false);
            checkForImages();
          }}
          setMessages={setMessages}
        />
      )}
      <VStack
        gap={4}
        textAlign="center">
        <Divider />
        <Heading size="sm">Staged Images to Move</Heading>
        <HStack
          maxW="1000px"
          alignItems="stretch"
          wrap="wrap">
          {filesToMove &&
            filesToMove.length > 0 &&
            filesToMove.map((file, i) => (
              <VStack
                key={i}
                style={{ padding: "5px" }}>
                <Button
                  variant="shopButt"
                  size="sm"
                  onClick={doDelete(`/files/big/${file}`)}>
                  delete
                </Button>
                <Image
                  src={`/files/big/${file}`}
                  alt={file}
                  width={75}
                  style={{ verticalAlign: "middle", padding: "0 10px" }}
                />
                <Checkbox
                  {...register("filesToMove")}
                  value={file}
                />
                {file}
              </VStack>
            ))}
        </HStack>
        <Button
          disabled={!filesToMove?.length}
          variant="shopButt"
          onClick={checkForImages}>
          Check For Staged Images
        </Button>
        <Divider />
        <Heading size="sm">Destination</Heading>
        <HStack>
          <Select
            {...register("toplevel")}
            onChange={onSelectDir}>
            <option value="">Pick a Destination</option>
            {toplevels.map((dir, i) => (
              <option
                value={dir}
                key={i}>
                {dir}
              </option>
            ))}
          </Select>
          {secondLevel.length > 0 && (
            <>
              /
              <Select {...register("secondLevels")}>
                <option value="">Pick a subdirectory</option>
                {secondLevel.map((dir, i) => (
                  <option
                    value={dir}
                    key={i}>
                    {dir}
                  </option>
                ))}
              </Select>
            </>
          )}
        </HStack>
        <Button
          disabled={!filesToMove?.length}
          variant="shopButt"
          onClick={handleSubmit(onSubmit)}>
          Move The images.
        </Button>
      </VStack>
    </PageLayout>
  );
};
export default Images;
