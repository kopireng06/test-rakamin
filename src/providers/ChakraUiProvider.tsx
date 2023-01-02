import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const theme = extendTheme({
  components: {
    Progress: {
      variants: {
        finished: {
          filledTrack: {
            background: "#43936C",
          },
        },
        onprogress: {
          filledTrack: {
            background: "#01959F",
          },
        },
      },
    },
  },
  sizes: {
    container: {
      "2xl": "1400px",
    },
  },
});

const ChakraUiProvider = ({ children }: PropsWithChildren) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export { ChakraUiProvider };
