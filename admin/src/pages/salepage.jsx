import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageLayout from "../bits/PageLayout";
import { Button, Center, FormControl, FormLabel, HStack, Input, Stack } from "@chakra-ui/react";
import InfoBubble from "../bits/info-bubble";

const getSale = (setSale, setMessages) => {
  fetch("http://localhost:4242/api/sale")
    .then((data) => data.json())
    .then((json) => {
      if (!isNaN(Number(json.sale))) {
        setSale(json);
      } else {
        setSale({ sale: 0 });
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get sale.");
    });
};

const Sale = () => {
  const [sale, setSale] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (sale === null) {
      getSale(setSale, setMessages);
    }
  }, [sale, setSale, setMessages]);

  const onSubmit = (values) => {
    fetch("http://localhost:4242/api/sale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getSale(setSale, () => {});
      })
      .catch((err) => {
        setMessages(err.message || "Failed to save sale.");
      });
  };

  if (sale === null) return null;

  return (
    <PageLayout
      messages={messages}
      title="Set Sale"
      button={{ action: onSubmit, text: "Update", value: "" }}>
      <SaleForm
        formData={sale}
        onSubmit={onSubmit}
      />
    </PageLayout>
  );
};

const SaleForm = ({ formData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData, mode: "onChange" });

  return (
    <Stack spacing={4}>
      <div>Current Sale: {formData?.sale}</div>
      <FormControl p={4}>
        <HStack alignItems="center">
          <FormLabel w={48}>
            Sale: <InfoBubble message="percent" />
          </FormLabel>
          <Input
            isInvalid={errors.sale ? true : false}
            errorBorderColor="red.300"
            type="text"
            placeholder=".00"
            {...register("sale", {
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

export default Sale;
