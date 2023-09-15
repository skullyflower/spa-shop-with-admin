import { Box } from "@chakra-ui/react";

export default function FloatingFormWrapper({ children }) {
  return (
    <div className="show">
      <div id="overlay"></div>
      <Box
        className="floater"
        p={5}
        shadow="xl"
        borderRadius={5}
        method="POST">
        {children}
      </Box>
    </div>
  );
}
