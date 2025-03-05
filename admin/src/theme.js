import { extendTheme, withDefaultProps } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const colors = {
  green: {
    50: "#F3FBE9",
    100: "#DEF4C3",
    200: "#C9ED9C",
    300: "#B5E675",
    400: "#A0DF4E",
    500: "#8BD728",
    600: "#6FAC20",
    700: "#538118",
    800: "#375610",
    900: "#1C2B08",
  },
  orange: {
    50: "#FFEFE6",
    100: "#FED2B8",
    200: "#FEB58B",
    300: "#FE985D",
    400: "#FD7B30",
    500: "#FD5E02",
    600: "#CA4B02",
    700: "#983901",
    800: "#652601",
    900: "#331300",
  },
  gray: {
    50: "#F2F2F3",
    100: "#DADBDD",
    200: "#C2C4C7",
    300: "#AAADB1",
    400: "#92969A",
    500: "#7B8084",
    600: "#62666A",
    700: "#4A4D4F",
    800: "#313335",
    900: "#191A1A",
  },
  slate: {
    50: "#F0F2F4",
    100: "#D5DBE1",
    200: "#BBC4CE",
    300: "#A0ADBB",
    400: "#8596A8",
    500: "#6A7F95",
    600: "#556677",
    700: "#404C59",
    800: "#2B333C",
    900: "#15191E",
  },
};

const inputStyles = extendTheme(
  withDefaultProps({
    defaultProps: {
      backgroundColor: "gray.900",
    },
    components: ["Input", "NumberInput", "TextArea"],
  }),
);
const theme = extendTheme({ config }, inputStyles, {
  colors: colors,
  styles: {
    global: {
      // styles for the `body`
      body: {
        fontFamily: '"Pangolin", "Comic Sans MS"',
        bg: "blackAlpha.900",
        color: "#efefef",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "slate.300",
        fontFamily: "Luckiest Guy",
        textShadow: "2px 2px 5px black",
        fontWeight: "normal",
      },
    },
    Card: {
      variants: {
        outline: { borderWidth: 2, outlineWidth: 2, borderColor: "slate.800" },
      },
    },
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        tratransition: "all 0.3s ease-out",
        borderRadius: "15px",
        border: "2px",
        borderColor: "slate.500",
        fontFamily: "Slackey",
        fontWeight: "bold",
      },
      variants: {
        shopButt: {
          color: "green.500",
          background: "gray.900",
          borderRadius: "7px",
          border: "2px",
          borderColor: "slate.500",
          fontFamily: '"Slackey", "Comic Sans MS", sans-serif',
          fontWeight: "bold",
          _hover: { bg: "orange.600" },
        },
        defaultProps: {
          size: "md", // default is md
          variant: "shopButt", // default is solid
        },
      },
      // 3. We can add a new visual variant
    },
  },
});

export default theme;
