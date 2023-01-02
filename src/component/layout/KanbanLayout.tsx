import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useRedirect } from "../../utils/useRedirect";

const Navbar = () => {
  return (
    <Box minH="64px" borderBottom="1px solid #E0E0E0">
      <Heading fontWeight="700" fontSize="18px" padding="18px 20px">
        Product Roadmap
      </Heading>
    </Box>
  );
};

const ErrorLayout = () => {
  useRedirect(window.location.pathname, process.env.PUBLIC_URL);

  return (
    <Flex height="full" justifyContent="center" alignItems="center">
      <Heading>ERROR</Heading>
    </Flex>
  );
};

const KanbanLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxW="container.2xl">
      <Navbar />
      {children}
    </Container>
  );
};

export { KanbanLayout, ErrorLayout };
