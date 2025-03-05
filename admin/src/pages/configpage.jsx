import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageLayout from "../bits/PageLayout";
import { Button, Center, FormControl, FormLabel, HStack, Input, Stack } from "@chakra-ui/react";
import InfoBubble from "../bits/info-bubble";

const getConfig = (setConfig, setMessages) => {
  fetch("http://localhost:4242/api/config")
    .then((data) => data.json())
    .then((json) => {
      setConfig(json);
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get config.");
    });
};

const Config = () => {
  const [config, setConfig] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (config === null) {
      getConfig(setConfig, setMessages);
    }
  }, [config, setConfig, setMessages]);

  const onSubmit = (values) => {
    fetch("http://localhost:4242/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        //getConfig(setConfig, () => {});
      })
      .catch((err) => {
        setMessages(err.message || "Failed to save config.");
      });
  };

  if (!config) return null;
  return (
    <PageLayout
      messages={messages}
      title="Set Config"
      button={{ action: onSubmit, text: "Update", value: "" }}>
      <ConfigForm
        formData={config}
        onSubmit={onSubmit}
      />
    </PageLayout>
  );
};

const ConfigForm = ({ formData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData, mode: "onChange" });

  return (
    <Stack spacing={4}>
      <div>Current Config: {formData.pathToSite}</div>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Shop Folder Path: <InfoBubble message="Relative path to the site you are editing" />
          </FormLabel>
          <Input
            isInvalid={errors.pathToSite ? true : false}
            errorBorderColor="red.300"
            type="text"
            placeholder="../foldername"
            {...register("pathToSite", {
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </HStack>
      </FormControl>
      <Center>
        <HStack gap={4}>
          <Button
            variant="shopButt"
            onClick={handleSubmit(onSubmit)}>
            Submit Changes
          </Button>
        </HStack>
      </Center>
    </Stack>
  );
};
export default Config;
