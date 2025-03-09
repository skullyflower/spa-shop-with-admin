import { Text } from "@chakra-ui/react";
import { useState } from "react";
import PageLayout from "../bits/PageLayout";
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
    <PageLayout title={`Welcome to the ${sitename} Admin`}>
      <Text>Use this admin to update content without having to rebuild the whole app. </Text>
    </PageLayout>
  );
};
export default Welcome;
