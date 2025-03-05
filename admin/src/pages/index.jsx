import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
const Welcome = () => {
  const [sitename, setSitename] = useState("Spa-Shop");

  fetch("/home")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        setSitename(data.sitename);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <Card
      className="content"
      marginInline={50}>
      <CardHeader>
        <Heading size="md">Welcome to the {sitename} Admin</Heading>
      </CardHeader>
      <CardBody>
        <Text>Use this admin to update content without having to rebuild the whole app. </Text>
      </CardBody>
    </Card>
  );
};
export default Welcome;
