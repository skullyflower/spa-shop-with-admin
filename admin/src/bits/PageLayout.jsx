import {
  Alert,
  Button,
  Card,
  CardHeader,
  Heading,
  CardBody,
  HStack,
  Stack,
} from "@chakra-ui/react";

const PageLayout = ({ messages, title, button, children }) => {
  return (
    <Card
      variant="outline"
      borderWidth={2}
      borderStyle="solid"
      borderColor="slate.500"
      w={["100%", "100%", "80%", "80%", "80%"]}
      marginInline={"auto"}>
      <CardHeader>
        <Stack gap={4}>
          <HStack
            align="center"
            justifyContent="space-between">
            <Heading
              textAlign="center"
              size="lg">
              {title}
            </Heading>
            {button && (
              <Button
                variant="shopButt"
                disabled={button.disabled}
                value={button.value}
                onClick={button.action}>
                {button.text}
              </Button>
            )}
          </HStack>
          {messages && <Alert>{messages}</Alert>}
        </Stack>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
export default PageLayout;
