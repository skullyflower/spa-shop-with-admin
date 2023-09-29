import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Image,
  Input,
  HStack,
  Center,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

const getPageData = (setLoading, setMessages, setPageData) => {
  setLoading(true);
  fetch("http://localhost:4242/api/pages")
    .then((data) => data.json())
    .then((json) => {
      setPageData(json);
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get page data.");
    });
};

export default function PageContent() {
  const [messages, setMessages] = useState(null);
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageData && !messages) {
      getPageData(setLoading, setMessages, setPageData);
    }
  }, [pageData, messages]);

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <Heading
        textAlign="center"
        size="md">
        Manage Site Data and Homepage
      </Heading>
      {loading ? (
        <Stack>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      ) : (
        <Box p={5}>Home Page Form</Box>
      )}
    </div>
  );
}
